import React from 'react';
import './DoctorForm.css';

function ReadOnlyConfirmation({ patient, goBack }) {
        if (!patient) return <p>Loading patient data...</p>;

        return (
            <div className="read-only-confirmation">
                    <h2>Patient Details: {patient.name}</h2>
                    <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                    <p><strong>DOB:</strong> {patient.dob || 'N/A'}</p>
                    <p><strong>Gender:</strong> {patient.gender || 'N/A'}</p>
                    <p><strong>Height:</strong> {patient.height || 'N/A'}</p>
                    <p><strong>Weight:</strong> {patient.weight || 'N/A'}</p>
                    <p><strong>Conditions:</strong> {patient.conditions || 'N/A'}</p>
                    <p><strong>Allergies:</strong> {patient.allergies || 'N/A'}</p>
                    <p><strong>Medications:</strong> {patient.medications?.join(', ') || 'N/A'}</p>
                    <p><strong>Smoking:</strong> {patient.smoking || 'N/A'}</p>
                    <p><strong>Alcohol:</strong> {patient.alcohol || 'N/A'}</p>
                    <p><strong>Exercise:</strong> {patient.exercise || 'N/A'}</p>

                    <button onClick={goBack}>Back to Dashboard</button>
            </div>
        );
}

export default ReadOnlyConfirmation;
