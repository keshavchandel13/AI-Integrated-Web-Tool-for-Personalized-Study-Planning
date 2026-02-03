# routes/progressRoutes.py
from flask import Blueprint, request,g
from Service.progressController import update_progress as handle_update_progress, get_progress as handle_get_progress
from middleware.jwt import token_required
progress_bp = Blueprint('progress_bp', __name__)

@progress_bp.route('/update', methods=['POST'])
@token_required
def update_progress_route():
    return handle_update_progress(g.user_id)

@progress_bp.route('/<int:user_id>/<int:subject_id>', methods=['GET'])
@token_required
def get_progress_route(user_id, subject_id):
    return handle_get_progress(g.user_id, subject_id)
