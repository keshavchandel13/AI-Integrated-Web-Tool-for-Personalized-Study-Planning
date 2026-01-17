from flask import Blueprint, jsonify, g
from middleware.jwt import token_required
user_bp = Blueprint('user', __name__)

@user_bp.route('/getuser', methods=['GET'])
@token_required
def getUser():
    return jsonify({f"message":{g.user_id}})