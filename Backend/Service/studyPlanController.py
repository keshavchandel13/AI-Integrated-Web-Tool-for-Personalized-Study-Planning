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

        # Fetch syllabus and preferences
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
        total_available_minutes = total_days * total_minutes_per_day

        # Calculate time needed per topic
        time_per_topic_list = [
            math.ceil((difficulty_level.get(dif.lower(), 2) / total_effort) * total_available_minutes)
            for _, _, dif in syllabus
        ]

        start_date = datetime.today()
        study_plan_data = []
        current_day = 1
        remaining_time_today = total_minutes_per_day

        for (topic_id, topic, difficulty), topic_time in zip(syllabus, time_per_topic_list):
            while topic_time > 0:
                # If topic fits in today's remaining time
                if topic_time <= remaining_time_today:
                    allocated = topic_time
                    topic_time = 0
                else:
                    # Fill the day completely, carry remaining to next day
                    allocated = remaining_time_today
                    topic_time -= remaining_time_today

                assigned_date = (start_date + timedelta(days=current_day - 1)).strftime("%Y-%m-%d")
                study_plan_data.append((subject_id, current_day, topic_id, allocated, 0, assigned_date))
                remaining_time_today -= allocated

                # If today's time is used up, move to next day
                if remaining_time_today <= 0 and current_day < total_days:
                    current_day += 1
                    remaining_time_today = total_minutes_per_day

                # Stop assigning if we've reached the max number of days
                if current_day > total_days:
                    break

            if current_day > total_days:
                break

        # Insert into DB
        cursor.executemany("""
            INSERT INTO study_plan (subject_id, day, topic_id, allocated_time, completed, date_assigned)
            VALUES (?, ?, ?, ?, ?, ?)
        """, study_plan_data)

        cursor.execute("UPDATE subjects SET is_plan_generated = 1 WHERE id = ?", (subject_id,))
        conn.commit()

        return jsonify({
            "message": f"Study plan generated successfully across {total_days} days.",
            "topics_covered": len(set([x[2] for x in study_plan_data])),
            "total_entries": len(study_plan_data)
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
        

        # Join study_plan with syllabus 
        cursor.execute("""
            SELECT sp.id, sp.subject_id, sp.topic_id, s.topic, sp.allocated_time, sp.date_assigned, sp.day, sp.completed
            FROM study_plan sp
            JOIN syllabus s ON sp.topic_id = s.id
            WHERE sp.subject_id = ?
        """, (subject_id,))

        rows = cursor.fetchall()

        # Convert each sqlite3.Row to a dictionary
        plan = [dict(row) for row in rows]


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


def update_topic():
    conn = None
    cursor = None
    try:
        data = request.get_json()
        required_fields = ["user_id", "subject_id", "topic_id"]
        missing = [f for f in required_fields if f not in data]

        if missing:
            return jsonify({
                "error": "Missing required fields",
                "missing": missing,
                "received": data
            }), 400
        
        user_id = data["user_id"]
        subject_id = data["subject_id"]
        topic_id = data["topic_id"]
        completed = data.get("completed", True)
        
        conn = get_db()
        cursor = conn.cursor()

       
        cursor.execute("""
            SELECT id FROM progress
            WHERE user_id = ? AND subject_id = ? AND topic_id = ?
        """, (user_id, subject_id, topic_id))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("""
                UPDATE progress
                SET completed = ?, updated_at = ?
                WHERE id = ?
            """, (completed, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), existing[0]))
        else:
            cursor.execute("""
                INSERT INTO progress (user_id, subject_id, topic_id, completed)
                VALUES (?, ?, ?, ?)
            """, (user_id, subject_id, topic_id, completed))

     
        cursor.execute("""
            UPDATE study_plan
            SET completed = 1
            WHERE subject_id = ? AND topic_id = ?
        """, (subject_id, topic_id))

        conn.commit()

        return jsonify({
            "message": "Topic marked as completed ",
            "topic_id": topic_id,
            "completed": True
        }), 200

    except Exception as e:
        print("Error in update_topic:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


    
        
        
    