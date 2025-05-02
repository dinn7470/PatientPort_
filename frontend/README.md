# PatientPort

PatientPort is a full-stack web application designed to help patients and doctors manage and access medical information securely. Patients can create profiles, input their medical history, and add licensed doctors. Doctors can view patients who have added them and access their profiles in a read-only format.

## Project Purpose

This application was created as a group project to demonstrate the integration of a full-stack web development solution using MongoDB, Express.js, and React. It focuses on secure data management and cross-role functionality between patients and healthcare professionals.

## Features

- Patient account creation and login
- Medical, lifestyle, and emergency contact data input
- Live doctor search with specialization filtering
- Doctor account creation and license verification
- Doctor login with multi-step authentication
- Patients can add and remove doctors
- Doctors can view linked patient profiles
- Emergency access mode for read only data viewing
- Bidirectional linking: patients see doctors and vice versa

## Technology Stack

- **Frontend**: React (with Vite)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose

## Running the Application Locally

### Backend Setup

1. Navigate to the backend directory:
    ```
    cd backend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the server:
    ```
    npm run dev
    ```
4. The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
    ```
    cd frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the development server:
    ```
    npm run dev
    ```
4. The frontend will run on `http://localhost:5173`

## Custom Functionality

This project includes a custom bidirectional doctor-patient linking feature:

- When a patient adds a doctor, the backend automatically links the patient to that doctor as well.
- The database ensures each side reflects this relationship using cross-referenced ObjectIds.
- This integration spans the frontend UI, backend API routes, and MongoDB schema.

## API Overview

Patient Routes:
- `POST /api/patient` — Register a new patient
- `POST /api/patient/login` — Login as a patient
- `PUT /api/patient` — Update patient info
- `GET /api/patient/:patientId/doctors` — Get patient’s doctors
- `POST /api/patient/:patientId/add-doctor` — Add a doctor to a patient
- `DELETE /api/patient/:patientId/remove-doctor/:doctorId` — Remove a doctor

Doctor Routes:
- `POST /api/doctor/signup` — Register a new doctor
- `POST /api/doctor/login` — First step of login
- `POST /api/doctor/verify-license` — Second step license verification
- `GET /api/doctor/:doctorId/patients` — Get patients linked to a doctor

## Collaboration

This project was completed by a team of two students. Each team member contributed to both frontend and backend development, including:

- Form design and validation
- API development and testing
- Doctor-patient data linking logic
- Styling and layout
- Debugging and deployment support

