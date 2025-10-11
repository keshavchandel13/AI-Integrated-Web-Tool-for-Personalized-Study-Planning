from flask import request, jsonify
from config.db import get_db
from datetime import datetime, timedelta
import math
import sqlite3

def generatePlan():
    conn = get_db()
    cursor = conn.cursor()

    try:
        data = request.get_json()
        subject_id = data.get("subject_id")
        if not subject_id:
            return jsonify({"error": "Subject ID is required"}), 400

        cursor.execute("SELECT id, topic, difficulty FROM syllabus WHERE subject_id = ?", (subject_id,))
        syllabus = cursor.fetchall()
        if not syllabus:
            return jsonify({"error": "No syllabus found for this subject"}), 404

        cursor.execute("SELECT total_days, daily_hours FROM study_preferences WHERE subject_id = ?", (subject_id,))
        pref = cursor.fetchone()
        if not pref:
            return jsonify({"error": "Study preferences not set for this subject"}), 404

        total_days, daily_hours = pref
        total_minutes_per_day = daily_hours * 60
        difficulty_level = {"easy": 1, "medium": 2, "hard": 3}

        total_effort = sum(difficulty_level.get(dif.lower(), 2) for _, _, dif in syllabus)
        start_date = datetime.today()
        current_day = 1
        current_time = 0
        study_plan_data = []

        for topic_id, topic, difficulty in syllabus:
            weight = difficulty_level.get(difficulty.lower(), 2)
            time_per_topic = math.ceil((weight / total_effort) * (total_days * total_minutes_per_day))

            if current_time + time_per_topic > total_minutes_per_day:
                current_day += 1
                current_time = 0

            assigned_date = (start_date + timedelta(days=current_day - 1)).strftime("%Y-%m-%d")
            study_plan_data.append((subject_id, current_day, topic_id, time_per_topic, 0, assigned_date))
            current_time += time_per_topic

        cursor.executemany("""
            INSERT INTO study_plan (subject_id, day, topic_id, allocated_time, completed, date_assigned)
            VALUES (?, ?, ?, ?, ?, ?)
        """, study_plan_data)

        cursor.execute("UPDATE subjects SET is_plan_generated = 1 WHERE id = ?", (subject_id,))
        conn.commit()

        return jsonify({
            "message": f"Study plan generated for {len(study_plan_data)} topics successfully!",
            "days_planned": total_days
        }), 201

    except Exception as e:
        print("Error generating plan:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


def get_plan():
    try:
        conn = get_db()
        conn.row_factory = sqlite3.Row 
        cursor = conn.cursor()

        subject_id = request.args.get("subject_id")
        print(subject_id)
        

        # Join study_plan with syllabus 
        cursor.execute("""
            SELECT sp.id, sp.subject_id, sp.topic_id, s.topic, sp.allocated_time, sp.date_assigned, sp.day
            FROM study_plan sp
            JOIN syllabus s ON sp.topic_id = s.id
            WHERE sp.subject_id = ?
        """, (subject_id,))

        rows = cursor.fetchall()

        # Convert each sqlite3.Row to a dictionary
        plan = [dict(row) for row in rows]

        print("Fetched plan:", plan)
        return jsonify(plan)

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

def subjectpreference():
    try:
        conn = get_db()
        cursor = conn.cursor()
        data = request.get_json()
        subjectId = data.get("subjectId")
        userId = data.get("userId")
        days = data.get("totalDays")
        dailyHours = data.get("dailyHours")
        preferredTime = data.get("preferredTime")
        cursor.execute(
            '''
            INSERT INTO study_preferences (user_id, subject_id, total_days, daily_hours, preferred_time, ai_confidence) VALUES
             (?,?, ?, ?, ?, ?)
            ''',
            (userId, subjectId, days, dailyHours, preferredTime, 1)
        )
        conn.commit()
        return jsonify({"message": "Preference saved"}), 200

    
    except Exception as err:
        return jsonify({"error": str(err)}), 400


        
    finally:
        cursor.close()
        conn.close()
        
        
    