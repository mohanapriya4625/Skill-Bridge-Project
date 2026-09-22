# SkillBridge

SkillBridge is a learning platform developed as part of the Yuva Internship project.

## Project Overview

SkillBridge helps students access study materials, practice aptitude questions, track their learning progress, and practice coding problems through an integrated frontend and backend system.

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Tailwind CSS

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

### Database
- MySQL

### API Testing
- Postman

## Main Features

- User Registration
- User Login
- JWT Authentication
- Protected Profile API
- Study Materials
- Aptitude Questions
- Progress Tracking
- Coding Practice
- Search and Filter
- Responsive User Interface
- Error Handling

## Backend API Endpoints

### Authentication

POST `/api/auth/register`

POST `/api/auth/login`

### Profile

GET `/api/profile`

### Study Materials

GET `/api/materials`

POST `/api/materials`

GET `/api/materials/:id`

PUT `/api/materials/:id`

DELETE `/api/materials/:id`

### Aptitude Questions

GET `/api/questions`

POST `/api/questions`

GET `/api/questions/:id`

PUT `/api/questions/:id`

DELETE `/api/questions/:id`

### Progress

POST `/api/progress`

GET `/api/progress/:user_id`

### Coding Practice

GET `/api/coding`

## How to Run the Project

### 1. Start MySQL

Start MySQL using XAMPP.

Make sure the `skillbridge` database is available.

### 2. Open Backend Folder

Open the terminal inside:

`skillbridge-backend`

### 3. Install Dependencies

```bash
npm install
Backend URL:

http://localhost:5000

API Testing

All major backend APIs were tested using Postman.

Project Status

Frontend and backend integration for Week 4 has been completed successfully.
