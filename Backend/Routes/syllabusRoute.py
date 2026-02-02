from flask import Blueprint,g
from Service.syllabusController import add_syllabus, get_syllabus
from middleware.jwt import token_required
syllabus_blueprint = Blueprint('syllabus', __name__)

@syllabus_blueprint.route('/addsyllabus', methods=['POST'])
@token_required
def addsyllabus():
   return  add_syllabus()
@syllabus_blueprint.route('/getsyllabus', methods=['GET'])
@token_required
def getsyllabus():
    return get_syllabus()