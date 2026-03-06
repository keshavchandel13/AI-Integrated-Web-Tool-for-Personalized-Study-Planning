# Service/progressController.py
from flask import request, jsonify
from config.db import get_db
from datetime import datetime

def update_progress(userId):
    data = request.get_json() or {}

    required_fields = ["subject_id", "topic_id"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user_id = userId
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
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Total topics
        cursor.execute(
            "SELECT COUNT(*) FROM syllabus WHERE subject_id = ?",
            (subject_id,)
        )
        total_topics = cursor.fetchone()[0] or 0

        # Completed topics
        cursor.execute("""
            SELECT COUNT(DISTINCT topic_id)
            FROM progress
            WHERE user_id = ? AND subject_id = ? AND completed = 1
        """, (user_id, subject_id))
        completed_topics = cursor.fetchone()[0] or 0

        completion_percent = (
            round((completed_topics / total_topics) * 100, 2)
            if total_topics > 0 else 0
        )

        # Average quiz score
        cursor.execute("""
            SELECT AVG(quiz_score)
            FROM progress
            WHERE user_id = ? AND subject_id = ? AND quiz_score IS NOT NULL
        """, (user_id, subject_id))
        avg_quiz_score = cursor.fetchone()[0]
        avg_quiz_score = round(avg_quiz_score, 2) if avg_quiz_score else 0

        # Total study time
        cursor.execute("""
            SELECT SUM(time_spent)
            FROM progress
            WHERE user_id = ? AND subject_id = ?
        """, (user_id, subject_id))
        total_study_time = cursor.fetchone()[0] or 0

        # Estimated time from syllabus
        cursor.execute("""
            SELECT SUM(estimated_time)
            FROM syllabus
            WHERE subject_id = ?
        """, (subject_id,))
        estimated_time = cursor.fetchone()[0] or 0

        # Study efficiency
        efficiency_score = 0
        if estimated_time > 0:
            efficiency_score = round(
                min((estimated_time / (total_study_time + 1)) * 100, 100), 2
            )

        # Weak topics (quiz_score < 50)
        cursor.execute("""
            SELECT s.topic, s.subtopic, p.quiz_score
            FROM progress p
            JOIN syllabus s ON p.topic_id = s.id
            WHERE p.user_id = ?
            AND p.subject_id = ?
            AND p.quiz_score IS NOT NULL
            AND p.quiz_score < 50
        """, (user_id, subject_id))

        weak_topics = []
        rows = cursor.fetchall()
        for row in rows:
            weak_topics.append({
                "topic": row[0],
                "subtopic": row[1],
                "quiz_score": row[2]
            })

        # Difficulty progress
        cursor.execute("""
            SELECT
                s.difficulty,
                COUNT(*) as total,
                SUM(CASE WHEN p.completed = 1 THEN 1 ELSE 0 END) as completed
            FROM syllabus s
            LEFT JOIN progress p
              ON s.id = p.topic_id AND p.user_id = ? AND p.subject_id = ?
            WHERE s.subject_id = ?
            GROUP BY s.difficulty
        """, (user_id, subject_id, subject_id))

        difficulty_progress = []
        for row in cursor.fetchall():
            difficulty_progress.append({
                "difficulty": row[0],
                "total": row[1],
                "completed": row[2] or 0
            })

        # Exam readiness score
        exam_readiness = round(
            (completion_percent * 0.5) +
            (avg_quiz_score * 0.3) +
            (efficiency_score * 0.2), 2
        )

        # Topic level details
        cursor.execute("""
            SELECT
                s.id,
                s.topic,
                s.subtopic,
                COALESCE(p.completed, 0),
                COALESCE(p.time_spent, 0),
                p.quiz_score
            FROM syllabus s
            LEFT JOIN progress p
              ON p.topic_id = s.id AND p.user_id = ? AND p.subject_id = ?
            WHERE s.subject_id = ?
            ORDER BY s.id ASC
        """, (user_id, subject_id, subject_id))

        topics = []
        rows = cursor.fetchall()

        for row in rows:
            topics.append({
                "topic_id": row[0],
                "topic": row[1],
                "subtopic": row[2],
                "completed": bool(row[3]),
                "time_spent": row[4],
                "quiz_score": row[5]
            })

        return jsonify({
            "user_id": user_id,
            "subject_id": subject_id,

            "completion_percent": completion_percent,
            "total_topics": total_topics,
            "completed_topics": completed_topics,

            "avg_quiz_score": avg_quiz_score,
            "total_study_time": total_study_time,
            "estimated_study_time": estimated_time,
            "efficiency_score": efficiency_score,
            "exam_readiness": exam_readiness,

            "weak_topics": weak_topics,
            "difficulty_progress": difficulty_progress,

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