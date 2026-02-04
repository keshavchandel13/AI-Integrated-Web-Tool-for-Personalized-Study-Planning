from flask import Blueprint, request, jsonify,current_app
from google import genai
import os


mentor_bp = Blueprint("mentor_bp", __name__)


MENTOR_TEMPLATE = """
You are EduPilot Mentor — a friendly, helpful, practical study mentor.

Your job:
- Answer only academic, study, or project-related questions
- Be straightforward and practical
- Keep answers short
- If user greets, greet him Back like if says hi say Hi, I am EduPilot Mentor
- If user asks something irrelevant, respond:
  "I can only help with study, projects, and productivity."

Now answer the student's question:

User: "{user_input}"
"""

@mentor_bp.route("/mentor", methods=["POST"])
def ask_gemini():
    try:
        api = current_app.config['GEMINI_API_KEY']
        client = genai.Client(api_key=api)
        data = request.get_json()
        prompt = data.get("prompt", "")
        final_prompt = MENTOR_TEMPLATE.format(user_input=prompt)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=final_prompt
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("Gemini Error:", e)
        return jsonify({"reply": "Something went wrong"}), 500
