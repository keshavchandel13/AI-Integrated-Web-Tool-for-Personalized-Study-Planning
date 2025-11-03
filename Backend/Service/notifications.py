from flask import jsonify
from datetime import date
from flask_mail import Message
from config.db import get_db
from extension import mail


def createnotifications(user_id):
    today = date.today().strftime("%Y-%m-%d")

    conn = get_db()
    cursor = conn.cursor()

    # Get all users
    cursor.execute("SELECT id, username, email FROM users")
    users = cursor.fetchall()

    for user in users:
        user_id, username, email = user

        # Get missed topics
        cursor.execute("""
            SELECT s.topic, sp.topic_id, sp.date_assigned, sp.completed
            FROM study_plan sp
            LEFT JOIN syllabus s ON sp.topic_id = s.id
            WHERE sp.subject_id IN (
                SELECT id FROM subjects WHERE user_id = ?
            )
            AND sp.completed = 0
            AND sp.date_assigned < ?
        """, (user_id, today))
        missed = cursor.fetchall()

        # Get today's topics
        cursor.execute("""
            SELECT s.topic, sp.topic_id, sp.date_assigned, sp.completed
            FROM study_plan sp
            LEFT JOIN syllabus s ON sp.topic_id = s.id
            WHERE sp.subject_id IN (
                SELECT id FROM subjects WHERE user_id = ?
            )
            AND sp.date_assigned = ?
        """, (user_id, today))
        today_tasks = cursor.fetchall()

        if not missed and not today_tasks:
            continue

        missed_text = "\n".join([f"- {m[0]} ({m[2]})" for m in missed]) if missed else "None"
        today_text = "\n".join([f"- {t[0]}" for t in today_tasks]) if today_tasks else "No new tasks."

        message = f"""
Hello {username},

Here's your study update for {today}:

 Missed Topics:
{missed_text}

 Today's Topics:
{today_text}

Stay consistent and keep learning 
— EDUPILOT TEAM —
        """

        # Store in notifications table
        if missed:
            cursor.execute("""
                INSERT INTO notifications (user_id, title, message, type)
                VALUES (?, ?, ?, ?)
            """, (user_id, "Missed Study Topics", missed_text, "missed"))
        if today_tasks:
            cursor.execute("""
                INSERT INTO notifications (user_id, title, message, type)
                VALUES (?, ?, ?, ?)
            """, (user_id, "Today's Study Plan", today_text, "today"))

        conn.commit()

        # Send Email
        msg = Message(
            subject="Your Study Reminder for Today",
            recipients=[email],
            body=message
        )
        try:
            mail.send(msg)
            print(f" Email sent to {email}")
        except Exception as e:
            print(f" Email failed for {email}: {e}")

    cursor.close()
    conn.close()
    return jsonify({"message": "Reminders generated and emails sent "}), 200


def getnotifications(user_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, title, message, type, is_read, created_at
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    """, (user_id,))
    notifications = cursor.fetchall()
    cursor.close()
    conn.close()

    data = [
        {
            "id": n[0],
            "title": n[1],
            "message": n[2],
            "type": n[3],
            "is_read": n[4],
            "created_at": n[5]
        }
        for n in notifications
    ]
    return jsonify(data), 200
