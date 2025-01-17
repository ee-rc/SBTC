
from flask import Flask, request, jsonify
import sqlite3
import bcrypt

app = Flask(__name__)

# Path to the SQLite database
DATABASE_FILE = 'database.sqlite'

# Helper function to connect to the database
def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row  # Allows accessing rows as dictionaries
    return conn

@app.route('/register', methods=['POST'])
def register():
    # Get JSON data from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the email already exists in the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        conn.close()
        return jsonify({"error": "Email already registered"}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert the new user into the database
    cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({"message": "Registration successful"}), 201

if __name__ == '__main__':
    app.run(debug=True)
