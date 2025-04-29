PatientPort Full-Stack Project

Project Overview

PatientPort is a secure full-stack patient information portal that allows individuals to create an account, log in, and view or update their medical data. It includes a custom Emergency Access Protocol that enables EMTs to access critical patient data using a time-sensitive access code without needing a login.

 Features

Patient signup with full personal, medical, lifestyle, and emergency contact information

Login and editable profile dashboard (Confirmation Page)

Secure, view-only Emergency Access Protocol

Edit patient information with success confirmation via snackbar

Tech Stack

Frontend: React
Backend: Node.js + Express.js
Database: MongoDB (via Mongoose ODM)

Custom Function: Emergency Access Protocol

Why: In emergencies, patients may be unable to log in, but EMTs still need access to life-saving information.

How It Works:

EMT enters patient's name and date of birth

System generates a unique 6-character access code that expires in 10 minutes

EMT enters the code to unlock a view-only confirmation screen with all relevant data

Security questions and editing are hidden in this mode

Involves:

Frontend: Custom form + conditional rendering in Confirmation

Backend: Two API routes to generate and verify code (/api/emergency/generate, /api/emergency/access)

Database: Query patients and return specific fields


How to Run

Backend

cd backend
npm install
npm run dev

Ensure .env includes your MongoDB URI

Frontend

cd frontend
npm install
npm run dev

Visit http://localhost:5173

API Endpoints

POST   /api/patient              - Create new patient
PUT    /api/patient              - Update patient by ID
POST   /api/patient/login        - Authenticate patient
POST   /api/emergency/generate   - Generate emergency code
POST   /api/emergency/access     - Verify emergency code

Database Schema (Patient)

{
name, email, password, dob, gender,
weight, height, symptoms, conditions, allergies,
medications, smoking, alcohol, exercise,
securityQuestion, securityAnswer,
emergencyContactName, emergencyContactRelationship, emergencyContactPhone
}

Team Collaboration

Frontend Lead: Member A (Form flow, conditional rendering, styling)

Backend Lead: Member B (MongoDB schema, emergency routes, login/update logic)

References

React Docs

Express Docs

MongoDB Atlas

Mongoose Docs

