import re
import json
import wikipediaapi
import nltk
from nltk import sent_tokenize
from google import genai
from config.db import get_db


nltk.download('punkt', quiet=True)


#  TEXT & WIKIPEDIA HELPERS


def getSubtopics(topic):
    """Fetch summary text for a topic from Wikipedia."""
    wiki_wiki = wikipediaapi.Wikipedia(user_agent='MyQuizApp/1.0')
    page = wiki_wiki.page(topic)
    return page.summary if page.exists() else ""


def preprocess(data):
    """Clean and normalize the Wikipedia summary text."""
    if not data:
        return ""
    data = " ".join(data.split())  
    data = re.sub(r'[^a-zA-Z0-9\s()]+', '', data)  
    return data.lower()


def split_sentences(text):
    """Split text into sentences using NLTK."""
    return sent_tokenize(text)



#  AI QUIZ GENERATION HELPERS


def clean_ai_json(raw_text):
    if not raw_text:
        return []

    try:

        cleaned = re.sub(r"^```json\s*|\s*```$", "", raw_text.strip(), flags=re.DOTALL).strip()

        data = json.loads(cleaned)


        if isinstance(data, list):
            return data
        elif isinstance(data, dict):
            return [data]
        else:
            return []
    except Exception as e:
        print(f" Failed to parse AI JSON: {e}")
        return []


def getQuestions(sentences, difficulty):
    client = genai.Client()

    prompt = f"""
    Generate 5 multiple-choice questions based on the following content:
    {sentences}
    Each question must include:
    - 4 answer options labeled A–D
    - The correct answer key (e.g. "B")
    - Difficulty: {difficulty}

    Return only valid JSON like this:
    [
        {{
            "question": "...",
            "options": ["A)...", "B)...", "C)...", "D)..."],
            "answer": "B"
        }}
    ]
    """
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    text = response.text if hasattr(response, "text") else str(response)

    questions = clean_ai_json(text)
    return questions if questions else text  
#  CREATE QUIZ SERVICE
def create_quiz_service(data):
    topic = data.get('topic')
    difficulty = data.get('difficulty', 'Medium')
    subject_id = data.get('subject_id')
    topic_id = data.get('topic_id')

    if not topic:
        return {"error": "Missing topic name", "status": 400}

    # Fetch Wikipedia text
    # raw_text = getSubtopics(topic)
    # if not raw_text:
    #     return {"error": f"No Wikipedia data found for {topic}", "status": 404}
    #
    # clean_text = preprocess(raw_text)
    # sentences = split_sentences(clean_text)



    # Get AI-generated questions
    questions_data = getQuestions(topic, difficulty)
    print(" AI raw output:", questions_data)

 
    conn = get_db()
    cursor = conn.cursor()

    # Save to DB
    if isinstance(questions_data, list):
     
        for q in questions_data:
            try:
                cursor.execute("""
                    INSERT INTO quizzes (subject_id, topic_id, question, options, answer, difficulty_level)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    subject_id,
                    topic_id,
                    q.get("question"),
                    json.dumps(q.get("options", [])),  
                    q.get("answer", ""),
                    difficulty
                ))
            except Exception as e:
                print(f" Failed to insert quiz question: {e}")
    else:
       
        cursor.execute("""
            INSERT INTO quizzes (subject_id, topic_id, question, options, answer, difficulty_level)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            subject_id,
            topic_id,
            "Raw text response",
            questions_data,
            "",
            difficulty
        ))

    conn.commit()
    conn.close()

    print(f" Quiz created successfully for topic: {topic}")
    return {
        "message": f"Quiz created successfully for topic '{topic}'.",
        "topic": topic,
        "difficulty": difficulty,
        "questions": questions_data,
        "status": 201
    }
#  GET QUIZ SERVICE
def get_quiz_service(topic_id):
    """Fetch quiz questions for a specific topic."""
    if not topic_id:
        return {"error": "Missing topic_id parameter", "status": 400}

    conn = get_db()
    cursor = conn.cursor()
    print(" Fetching quiz for topic ID:", topic_id)

    cursor.execute("SELECT * FROM quizzes WHERE topic_id = ?", (topic_id,))
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        return {"message": "No quizzes found for this topic", "status": 404}

    quizzes = []
    for row in rows:
        try:
  
            options = json.loads(row[4]) if row[4] else []
        except Exception:
       
            print(f" Invalid JSON in quiz ID {row[0]}, returning as plain text")
            options = [row[4]] if row[4] else []

        quizzes.append({
            "id": row[0],
            "subject_id": row[1],
            "topic_id": row[2],
            "question": row[3],
            "options": options,
            "answer": row[5],
            "difficulty_level": row[6]
        })

    return {"quizzes": quizzes, "status": 200}
