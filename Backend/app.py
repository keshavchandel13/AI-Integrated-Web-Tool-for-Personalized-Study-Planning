from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import extensions
from extension import bcrypt, mail

# Import blueprints
from Routes.authRoute import auth_blueprint
from Routes.syllabusRoute import syllabus_blueprint
from Routes.subjectRoute import subject_blueprint
from Routes.studyPlanRoute import studyplan_blueprint
from Routes.quizRoute import quiz_bp
from Routes.progressRoute import progress_bp
from Routes.notificationRoute import notifications_bp
# from Routes.GeminiRoute import mentor_bp
from Routes.userRoute import user_bp

# Import database utilities
from config.db import get_db, close_connection

load_dotenv()

app = Flask(__name__)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = ('Study Planner', os.getenv('MAIL_USERNAME'))
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['CLOUDINARY_API_KEY'] = os.getenv('CLOUDINARY_API_KEY')
app.config['CLOUDINARY_CLOUD_NAME'] = os.getenv('CLOUDINARY_CLOUD_NAME')
app.config['CLOUDINARY_API_SECRET'] = os.getenv('CLOUDINARY_API_SECRET')

# Initialize extensions
bcrypt.init_app(app)
mail.init_app(app)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Register blueprints
app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(syllabus_blueprint, url_prefix='/api/syllabus')
app.register_blueprint(subject_blueprint, url_prefix='/api/subject')
app.register_blueprint(studyplan_blueprint, url_prefix='/api/studyplan')
app.register_blueprint(quiz_bp, url_prefix='/api')
app.register_blueprint(progress_bp, url_prefix='/api/progress')
app.register_blueprint(notifications_bp, url_prefix='/api/notifications')
# app.register_blueprint(mentor_bp, url_prefix='/api/gemini')
app.register_blueprint(user_bp, url_prefix="/api/user")



# Database teardown
app.teardown_appcontext(close_connection)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
