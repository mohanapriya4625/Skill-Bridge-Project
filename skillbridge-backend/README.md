# SkillBridge - Placement Preparation Portal

## 📌 Project Overview

SkillBridge is a web-based Placement Preparation Portal designed to help students prepare for technical and placement examinations.

The platform provides study materials, aptitude practice, logical reasoning, coding practice, progress tracking, and user authentication.

For Week 3, a RESTful backend API has been developed to connect the SkillBridge frontend with a MySQL database.

---

## 🎯 Project Objectives

- Provide students with organized placement preparation resources.
- Manage study materials through REST APIs.
- Provide aptitude questions through APIs.
- Store and retrieve student learning progress.
- Implement secure user registration and login.
- Use JWT authentication for protected APIs.
- Store application data in MySQL.
- Test APIs using Postman.

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication & Security
- bcryptjs
- JSON Web Token (JWT)

### API Testing
- Postman

### Other Packages
- CORS
- dotenv
- Nodemon

---

## 📁 Backend Project Structure

```text
skillbridge-backend/
│
├── server.js
├── db.js
├── package.json
├── README.md
│
├── middleware/
│   └── authMiddleware.js
│
└── routes/
    ├── auth.js
    ├── profile.js
    ├── materials.js
    ├── questions.js
    └── progress.js
    🔐 Authentication APIs
1. Register User

Method: POST

Endpoint:

/api/auth/register

Full URL:

http://localhost:5000/api/auth/register
Request Body
{
    "name": "Mohana",
    "email": "example@gmail.com",
    "password": "123456"
}
Response
{
    "success": true,
    "message": "User registered successfully",
    "userId": 1
}
2. Login User

Method: POST

Endpoint:

/api/auth/login

Full URL:

http://localhost:5000/api/auth/login
Request Body
{
    "email": "example@gmail.com",
    "password": "123456"
}
Response
{
    "success": true,
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": 1,
        "name": "Mohana",
        "email": "example@gmail.com",
        "role": "student"
    }
}
👤 Profile API
3. Get Protected Profile

Method: GET

Endpoint:

/api/profile

Full URL:

http://localhost:5000/api/profile
Authentication

The API requires a JWT token.

Authorization: Bearer JWT_TOKEN
Response
{
    "success": true,
    "message": "Protected Profile API accessed successfully!",
    "user": {
        "id": 1,
        "email": "example@gmail.com",
        "role": "student"
    }
}
📚 Study Materials APIs
4. Create Study Material

Method: POST

Endpoint:

/api/materials
Request Body
{
    "title": "JavaScript Fundamentals",
    "category": "JavaScript",
    "description": "Learn the basics of JavaScript programming.",
    "content": "Variables, functions, arrays, objects, DOM and events."
}
5. Get All Study Materials

Method: GET

Endpoint:

/api/materials
6. Get Single Study Material

Method: GET

Endpoint:

/api/materials/:id
Example
http://localhost:5000/api/materials/1
7. Update Study Material

Method: PUT

Endpoint:

/api/materials/:id
Example
http://localhost:5000/api/materials/1
Request Body
{
    "title": "Advanced JavaScript",
    "category": "JavaScript",
    "description": "Learn advanced JavaScript concepts.",
    "content": "Functions, arrays, objects, DOM, events and ES6."
}
8. Delete Study Material

Method: DELETE

Endpoint:

/api/materials/:id
Example
http://localhost:5000/api/materials/1
🧠 Aptitude Question APIs
9. Create Aptitude Question

Method: POST

Endpoint:

/api/questions
Request Body
{
    "question": "What is 20% of 150?",
    "option_a": "20",
    "option_b": "25",
    "option_c": "30",
    "option_d": "35",
    "correct_answer": "C",
    "explanation": "20% of 150 = 30."
}
10. Get All Questions

Method: GET

Endpoint:

/api/questions
11. Get Single Question

Method: GET

Endpoint:

/api/questions/:id
Example
http://localhost:5000/api/questions/1
12. Update Question

Method: PUT

Endpoint:

/api/questions/:id
Example
http://localhost:5000/api/questions/1
13. Delete Question

Method: DELETE

Endpoint:

/api/questions/:id
Example
http://localhost:5000/api/questions/1
📊 Progress APIs
14. Save Student Progress

Method: POST

Endpoint:

/api/progress
Request Body
{
    "user_id": 1,
    "category": "JavaScript",
    "completed": 1,
    "score": 90
}
Response
{
    "success": true,
    "message": "Progress saved successfully",
    "progressId": 1
}
15. Get User Progress

Method: GET

Endpoint:

/api/progress/:user_id
Example
http://localhost:5000/api/progress/1
🗄️ Database

The project uses MySQL database named:

skillbridge
Main Tables
users
study_materials
aptitude_questions
progress
Users Table

Stores student registration and authentication information.

Study Materials Table

Stores placement preparation study materials.

Aptitude Questions Table

Stores aptitude questions, options, correct answers and explanations.

Progress Table

Stores student learning progress and scores.

🔒 Security Features

The backend implements:

Password hashing using bcryptjs.
JWT-based authentication.
Protected profile endpoint.
Input validation.
HTTP status codes.
Error handling.
Parameterized MySQL queries.
🧪 API Testing

The REST APIs were tested using Postman.

The following operations were tested:

User Registration
User Login
JWT Protected Profile
Study Material CRUD
Aptitude Question CRUD
Student Progress

Postman collection is maintained for organizing and testing the APIs.

▶️ How to Run the Backend
Step 1 - Install Dependencies

Open terminal inside the backend folder:

npm install
Step 2 - Start MySQL

Start MySQL using XAMPP.

Make sure the MySQL service is running.

Step 3 - Start Node.js Server
node server.js

The server runs at:

http://localhost:5000
Step 4 - Test API

Open:

http://localhost:5000

Expected response:

{
    "success": true,
    "message": "SkillBridge Backend API is running successfully!",
    "version": "1.0.0"
}
📌 API Summary
Module	Method	Endpoint
Register	POST	/api/auth/register
Login	POST	/api/auth/login
Profile	GET	/api/profile
Materials	POST	/api/materials
Materials	GET	/api/materials
Material	GET	/api/materials/:id
Material	PUT	/api/materials/:id
Material	DELETE	/api/materials/:id
Questions	POST	/api/questions
Questions	GET	/api/questions
Question	GET	/api/questions/:id
Question	PUT	/api/questions/:id
Question	DELETE	/api/questions/:id
Progress	POST	/api/progress
Progress    GET    /api/progress/:user_id