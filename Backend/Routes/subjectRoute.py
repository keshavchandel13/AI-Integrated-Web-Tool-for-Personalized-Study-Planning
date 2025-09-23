from flask import Blueprint
from Service.subjectController import add_subject,get_subjects
subject_blueprint = Blueprint('subject', __name__)


@subject_blueprint.route('/addsubject', methods=['POST'])
def addsubject():
    return add_subject()
@subject_blueprint.route('/getsubjects', methods=['GET'])
def getsubject():
    return get_subjects()