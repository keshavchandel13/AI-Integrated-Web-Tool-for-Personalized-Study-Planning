from flask import Blueprint, request,g
from Service.notifications import getnotifications, createnotifications
from middleware.jwt import token_required
# Blueprint instance
notifications_bp = Blueprint('notifications_bp', __name__)

#  Get notifications for a specific user
@notifications_bp.route('/<int:userId>', methods=['GET'])
@token_required
def getnotification():
    return getnotifications(g.user_id)

#  Create notifications for all users (or specific user if passed)
@notifications_bp.route('/', methods=['POST'])
@token_required
def createnotification():
    return createnotifications(g.user_id)
