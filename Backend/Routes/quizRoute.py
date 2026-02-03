from flask import Blueprint, request, jsonify
from Service.QuizController import create_quiz_service, get_quiz_service
from middleware.jwt import token_required

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/quiz', methods=['POST'])
@token_required
def create_quiz():
    try:
        data = request.get_json()
        result = create_quiz_service(data)
        return jsonify(result), result.get("status", 200)
    except Exception as e:
        print("Error in create_quiz:", e)
        return jsonify({'error': str(e)}), 500


@quiz_bp.route('/quiz', methods=['GET'])
@token_required
def get_quiz():
    try:
        topic_id = request.args.get('topic_id')
        result = get_quiz_service(topic_id)
        return jsonify(result), result.get("status", 200)
    except Exception as e:
        print("Error in get_quiz:", e)
        return jsonify({'error': str(e)}), 500
