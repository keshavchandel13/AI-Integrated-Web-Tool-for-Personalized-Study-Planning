from flask import request, jsonify
from config.db import get_db
import fitz  
import os
import uuid

UPLOAD_FOLDER = "uploads/syllabus/"  
import json
from google import genai
def extract_topics(text):
    try:
        client = genai.Client()

        prompt = f"""
Extract only syllabus topics from the following text.

Ignore explanations, descriptions, and paragraphs.

Return JSON in this format:

{{
 "topics":[
   {{
     "topic":"Normalization",
     "difficulty":"hard"
   }},
   {{
     "topic":"Indexing",
     "difficulty":"medium"
   }}
 ]
}}

Text:
{text[:6000]}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        data_text = response.text.strip()

        if data_text.startswith("```"):
            data_text = data_text.replace("```json", "").replace("```", "").strip()

        data = json.loads(data_text)

        return data.get("topics", [])

    except Exception as e:
        print("AI extraction error:", e)
        return []
def add_syllabus():
    conn = get_db()
    cursor = conn.cursor()

    subject_id = request.form.get("subject_Id")
    syllabus_file = request.files.get("syllabus")
    if not subject_id or not syllabus_file:
        return jsonify({"error": "subject_id and syllabus file are required"}), 400

    # Save file with unique name
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads", "syllabus")
    filename = f"{uuid.uuid4().hex}.pdf"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    syllabus_file.save(file_path)



    # Extract text from PDF
    doc = fitz.open(file_path)
    text = ""
    for page_num, page in enumerate(doc, start=1):
        page_text = page.get_text("text")
        text += page_text
    doc.close()

    topics = extract_topics(text)

    if not topics:
        return jsonify({"error": "AI failed to extract topics"}), 500
    cursor.execute("DELETE FROM syllabus WHERE subject_id = ?", (subject_id,))

    # Insert topics into syllabus table
    for topic in topics:
        cursor.execute(
            """
            INSERT INTO syllabus (subject_id, topic, difficulty)
            VALUES (?, ?, ?)
            """,
            (
                subject_id,
                topic.get("topic"),
                topic.get("difficulty", "medium")
            )
        )
    conn.commit()
    conn.close()

    return jsonify({
        "message": "Syllabus uploaded and topics extracted successfully",
        "topics_count": len(topics)
    }), 201


# Get syllabus by subject_id
def get_syllabus():
    conn = get_db()
    cursor = conn.cursor()
    subject_id = request.args.get("subject_id")

    if not subject_id:
        return jsonify({"error": "subject_id is required"}), 400

    cursor.execute('''
        SELECT id, subject_id, topic, difficulty, created_at
        FROM syllabus
        WHERE subject_id = ?
    ''', (subject_id,))

    rows = cursor.fetchall()
    conn.close()

    print("[DEBUG] Rows fetched:", len(rows))

    syllabus_list = []
    for row in rows:
        syllabus_list.append({
            "id": row[0],
            "subject_id": row[1],
            "topic": row[2],
            "difficulty": row[3],
            "created_at": row[4]
        })

    return jsonify(syllabus_list), 200
