from flask import Blueprint, request
from Service.notifications import getnotifications, createnotifications

# Blueprint instance
notifications_bp = Blueprint('notifications_bp', __name__)

#  Get notifications for a specific user
@notifications_bp.route('/<int:userId>', methods=['GET'])
def getnotification(userId):
    return getnotifications(userId)

#  Create notifications for all users (or specific user if passed)
@notifications_bp.route('/', methods=['POST'])
def createnotification():
    data = request.get_json()
    user_id = data.get('user_id') if data else None 
    return createnotifications(user_id)
