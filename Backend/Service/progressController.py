# Service/progressController.py
from flask import request, jsonify
from config.db import get_db
from datetime import datetime

def update_progress():
    """
    POST /api/progress/update
    body:
    {
      "user_id": 1,
      "subject_id": 2,
      "topic_id": 3,
      "quiz_score": 85,         # optional
      "completed": true,        # optional
      "time_spent": 45          # optional (minutes)
    }
    """
    data = request.get_json() or {}

    required_fields = ["user_id", "subject_id", "topic_id"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user_id = data["user_id"]
    subject_id = data["subject_id"]
    topic_id = data["topic_id"]
    quiz_score = data.get("quiz_score", None)
    completed = int(bool(data.get("completed", False)))
    time_spent = int(data.get("time_spent", 0))

    try:
        conn = get_db()
        cursor = conn.cursor()

        # check if record exists
        cursor.execute("""
            SELECT id FROM progress
            WHERE user_id = ? AND subject_id = ? AND topic_id = ?
        """, (user_id, subject_id, topic_id))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("""
                UPDATE progress
                SET completed = ?, quiz_score = ?, time_spent = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            """, (completed, quiz_score, time_spent, existing[0]))
        else:
            cursor.execute("""
                INSERT INTO progress (user_id, subject_id, topic_id, completed, quiz_score, time_spent)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (user_id, subject_id, topic_id, completed, quiz_score, time_spent))

        conn.commit()
        return jsonify({"message": "Progress updated successfully"}), 200

    except Exception as e:
        print("Error updating progress:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        try:
            cursor.close()
        except:
            pass
        try:
            conn.close()
        except:
            pass


def get_progress(user_id, subject_id):
    """
    GET /api/progress/<user_id>/<subject_id>
    Returns:
    {
      "user_id": 1,
      "subject_id": 2,
      "completion_percent": 60.0,
      "total_topics": 10,
      "completed_topics": 6,
      "topics": [
         { "topic_id": 5, "topic": "Arrays", "subtopic": "Arrays - basics", "completed": true, "time_spent": 30, "quiz_score": 80 },
         ...
      ]
    }
    """
    try:
        conn = get_db()
        cursor = conn.cursor()

        # total topics for subject (from syllabus)
        cursor.execute("SELECT COUNT(*) FROM syllabus WHERE subject_id = ?", (subject_id,))
        total_topics = cursor.fetchone()[0] or 0

        # completed topics for this user+subject
        cursor.execute("""
            SELECT COUNT(DISTINCT topic_id) FROM progress
            WHERE user_id = ? AND subject_id = ? AND completed = 1
        """, (user_id, subject_id))
        completed_topics = cursor.fetchone()[0] or 0

        completion_percent = round((completed_topics / total_topics) * 100, 2) if total_topics > 0 else 0.0

        # fetch topic-level details: left join syllabus with progress (if exists)
        cursor.execute("""
            SELECT
                s.id AS topic_id,
                s.topic,
                s.subtopic,
                COALESCE(p.completed, 0) AS completed,
                COALESCE(p.time_spent, 0) AS time_spent,
                p.quiz_score
            FROM syllabus s
            LEFT JOIN progress p
              ON p.topic_id = s.id AND p.user_id = ? AND p.subject_id = ?
            WHERE s.subject_id = ?
            ORDER BY s.id ASC
        """, (user_id, subject_id, subject_id))

        rows = cursor.fetchall()
        topics = []
        for row in rows:
            topic_id, topic_name, subtopic, completed_flag, time_spent, quiz_score = row
            topics.append({
                "topic_id": topic_id,
                "topic": topic_name,
                "subtopic": subtopic,
                "completed": bool(completed_flag),
                "time_spent": time_spent,
                "quiz_score": quiz_score
            })

        return jsonify({
            "user_id": user_id,
            "subject_id": subject_id,
            "completion_percent": completion_percent,
            "total_topics": total_topics,
            "completed_topics": completed_topics,
            "topics": topics
        }), 200

    except Exception as e:
        print("Error fetching progress:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        try:
            cursor.close()
        except:
            pass
        try:
            conn.close()
        except:
            pass
