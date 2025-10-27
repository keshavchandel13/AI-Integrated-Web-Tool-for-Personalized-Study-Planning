# routes/progressRoutes.py
from flask import Blueprint, request
from Service.progressController import update_progress as handle_update_progress, get_progress as handle_get_progress

progress_bp = Blueprint('progress_bp', __name__)

@progress_bp.route('/update', methods=['POST'])
def update_progress_route():
    return handle_update_progress()

@progress_bp.route('/<int:user_id>/<int:subject_id>', methods=['GET'])
def get_progress_route(user_id, subject_id):
    return handle_get_progress(user_id, subject_id)
