from flask import request, jsonify
from config.db import get_db
import fitz  
import os
import uuid

UPLOAD_FOLDER = "uploads/syllabus/"  

# Add syllabus
def add_syllabus():
    conn = get_db()
    cursor = conn.cursor()

    subject_id = request.form.get("subject_Id")
    syllabus_file = request.files.get("syllabus")

    print("[DEBUG] subject_id received:", subject_id)
    print("[DEBUG] syllabus_file received:", syllabus_file.filename if syllabus_file else None)

    if not subject_id or not syllabus_file:
        return jsonify({"error": "subject_id and syllabus file are required"}), 400

    # Save file with unique name
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    filename = f"{uuid.uuid4().hex}.pdf"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    syllabus_file.save(file_path)

    print("[DEBUG] File saved at:", file_path)

    # Extract text from PDF
    doc = fitz.open(file_path)
    text = ""
    for page_num, page in enumerate(doc, start=1):
        page_text = page.get_text("text")
        print(f"[DEBUG] Extracted text from page {page_num}: {len(page_text)} characters")
        text += page_text
    doc.close()

    # Split by newlines into topics
    topics = [line.strip() for line in text.split("\n") if line.strip()]
    print("[DEBUG] Total topics extracted:", len(topics))
    print("[DEBUG] Sample topics:", topics[:5])  

    # Insert topics into syllabus table
    for idx, topic in enumerate(topics, start=1):
        cursor.execute(
            """
            INSERT INTO syllabus (subject_id, topic, difficulty)
            VALUES (?, ?, ?)
            """,
            (subject_id, topic, "medium")
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

    print("[DEBUG] Fetching syllabus for subject_id:", subject_id)

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
