from flask import Blueprint, jsonify, g
from middleware.jwt import token_required
from Service.userController import getuser
user_bp = Blueprint('user', __name__)

@user_bp.route('/getuser', methods=['GET'])
@token_required
def getUsers():
    return getuser(g.user_id)
