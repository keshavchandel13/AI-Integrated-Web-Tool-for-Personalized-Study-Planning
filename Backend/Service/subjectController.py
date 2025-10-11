from flask import request, jsonify
from config.db import get_db

def add_subject():
    try:
        conn = get_db()
        cursor = conn.cursor()
        data = request.get_json()

        user_id = data.get("user_id")
        print(user_id)
        title = data.get("title")
        subject_name = data.get("subject_name")
        grade = data.get("grade")
        start_date = data.get("start_date")
        end_date = data.get("end_date")

        if not user_id or not title or not subject_name:
            return jsonify({"error": "all fields are required"}), 400

        cursor.execute('''
            INSERT INTO subjects (user_id, title, subject_name, grade, start_date, end_date)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, title, subject_name, grade, start_date, end_date))

        conn.commit()
        subject_id = cursor.lastrowid  
        conn.close()

        return jsonify({
            "message": "Subject added successfully",
            "subject_id": subject_id
        }), 201
    except Exception as e:
        if 'conn' in locals():
            conn.close()
        return jsonify({"error": str(e)}), 500
    
def get_subjects():
    try:
        conn = get_db()
        cursor = conn.cursor()
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        cursor.execute('''
            SELECT id, title, subject_name, grade, start_date, end_date, is_plan_generated
            FROM subjects
            WHERE user_id = ?
            ORDER BY start_date ASC
        ''', (user_id,))

        rows = cursor.fetchall()
        conn.close()
        subjects = []
        for row in rows:
            subjects.append({
                "id": row[0],
                "title": row[1],
                "subject_name": row[2],
                "grade": row[3],
                "start_date": row[4],
                "end_date": row[5],
                "is_plan_generated": row[6],
            })

        return jsonify(subjects), 200
    except Exception as e:
        if 'conn' in locals():
            conn.close()
        return jsonify({"error": str(e)}), 500
