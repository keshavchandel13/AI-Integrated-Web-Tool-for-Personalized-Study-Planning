from flask import Blueprint
from Service.studyPlanController import generatePlan,get_plan, subjectpreference
studyplan_blueprint = Blueprint('studyplan', __name__)


@studyplan_blueprint.route('/generateplan', methods=['POST'])
def generateplan():
    return generatePlan()
@studyplan_blueprint.route('/getstudyplan', methods=['GET'])
def getplan():
    return get_plan()
@studyplan_blueprint.route('/preference', methods=['POST'])
def subjectpref():
    return subjectpreference()