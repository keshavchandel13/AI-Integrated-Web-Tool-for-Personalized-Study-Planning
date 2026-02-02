from flask import Blueprint,g
from middleware.jwt import token_required
from Service.studyPlanController import generatePlan,get_plan, subjectpreference, update_topic
studyplan_blueprint = Blueprint('studyplan', __name__)


@studyplan_blueprint.route('/generateplan', methods=['POST'])
@token_required
def generateplan():
    return generatePlan()
@studyplan_blueprint.route('/getstudyplan', methods=['GET'])
@token_required
def getplan():
    return get_plan()
@studyplan_blueprint.route('/preference', methods=['POST'])
@token_required
def subjectpref():
    return subjectpreference(g.user_id)
@studyplan_blueprint.route('/topiccompleted', methods=['POST'])
@token_required
def mark_topic_completed():
    return update_topic(g.user_id)