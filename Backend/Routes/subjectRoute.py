from flask import Blueprint, g
from Service.subjectController import add_subject,get_subjects
from middleware.jwt import token_required
subject_blueprint = Blueprint('subject', __name__)


@subject_blueprint.route('/addsubject', methods=['POST'])
@token_required
def addsubject():
    return add_subject(g.user_id)
@subject_blueprint.route('/getsubjects', methods=['GET'])
@token_required
def getsubject():
    return get_subjects(g.user_id)