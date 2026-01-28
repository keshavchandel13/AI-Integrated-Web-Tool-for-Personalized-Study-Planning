import sqlite3

DATABASE = "../database.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Users Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            branch TEXT,
            bio TEXT,
            college TEXT,
            avatar TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Subjects Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            subject_name TEXT,
            grade TEXT,
            start_date TEXT,
            end_date TEXT,
            is_plan_generated BOOLEAN DEFAULT 0,
            completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    """)

    # Syllabus Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS syllabus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_id INTEGER,
            topic TEXT,
            subtopic TEXT,                         
            difficulty TEXT,                       
            estimated_time INTEGER,                
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(subject_id) REFERENCES subjects(id)
        )
    """)

    # Study Plan Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_plan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_id INTEGER,
            day INTEGER,
            topic_id INTEGER,                      
            allocated_time INTEGER,                
            recommended_order INTEGER,             
            completed BOOLEAN DEFAULT 0,
            date_assigned TEXT,                    
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(subject_id) REFERENCES subjects(id),
            FOREIGN KEY(topic_id) REFERENCES syllabus(id)
        )
    """)

    # Quiz Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quizzes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_id INTEGER,
            topic_id INTEGER,                     
            question TEXT,
            options TEXT,                          
            answer TEXT,
            difficulty_level TEXT,                 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(subject_id) REFERENCES subjects(id),
            FOREIGN KEY(topic_id) REFERENCES syllabus(id)
        )
    """)

    # Progress Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            subject_id INTEGER,
            topic_id INTEGER,
            completed BOOLEAN DEFAULT 0,
            quiz_score REAL,                       
            time_spent INTEGER,                    
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(subject_id) REFERENCES subjects(id),
            FOREIGN KEY(topic_id) REFERENCES syllabus(id)
        )
    """)

    # User Study Preferences Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            subject_id INTEGER,
            total_days INTEGER,                    
            daily_hours INTEGER,                   
            preferred_time TEXT,                   
            ai_confidence REAL DEFAULT 0.0,        
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(subject_id) REFERENCES subjects(id)
        )
    """)
    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS notifications(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            subject_id INTEGER,
            title TEXT,
            message TEXT,
            type TEXT,
            is_read BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (subject_id) REFERENCES subjects(id)
            
        )
        '''
    )

 
    conn.commit()
    conn.close()
    print(" Database initialized successfully with updated schema!")

if __name__ == "__main__":
    print("Initializing database...")
    init_db()
