from flask import Blueprint
from Service.syllabusController import add_syllabus, get_syllabus
syllabus_blueprint = Blueprint('syllabus', __name__)

@syllabus_blueprint.route('/addsyllabus', methods=['POST'])
def addsyllabus():
   return  add_syllabus()
@syllabus_blueprint.route('/getsyllabus', methods=['GET'])
def getsyllabus():
    return get_syllabus()