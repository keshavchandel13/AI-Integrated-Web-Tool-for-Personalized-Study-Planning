from flask import Blueprint

syllabus_blueprint = Blueprint('syllabus', __name__)

@syllabus_blueprint.route('/add', methods=['POST'])
def addsyllabus():
    print("Adding syllabus")
    