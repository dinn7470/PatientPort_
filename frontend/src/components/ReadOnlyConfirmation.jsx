import React from 'react';
import './DoctorForm.css';

function ReadOnlyConfirmation({ patient, goBack }) {
    return (
        <div className="form-page">
            <h2>Patient Information (Read-Only)</h2>

            <div className="form-group"><strong>Name:</strong> {patient.name}</div>
            <div className="form-group"><strong>Email:</strong> {patient.email}</div>
            <div className="form-group"><strong>Date of Birth:</strong> {patient.dob}</div>
            <div className="form-group"><strong>Weight:</strong> {patient.weight}</div>
            <div className="form-group"><strong>Height:</strong> {patient.height}</div>
            <div className="form-group"><strong>Gender:</strong> {patient.gender}</div>
            <div className="form-group"><strong>Symptoms:</strong> {patient.symptoms}</div>
            <div className="form-group"><strong>Conditions:</strong> {patient.conditions}</div>
            <div className="form-group"><strong>Allergies:</strong> {patient.allergies}</div>
            <div className="form-group"><strong>Medications:</strong> {patient.medications.join(', ')}</div>
            <div className="form-group"><strong>Smoking:</strong> {patient.smoking}</div>
            <div className="form-group"><strong>Alcohol:</strong> {patient.alcohol}</div>
            <div className="form-group"><strong>Exercise:</strong> {patient.exercise}</div>
            <div className="form-group"><strong>Emergency Contact:</strong> {patient.emergencyContactName}</div>
            <div className="form-group"><strong>Relationship:</strong> {patient.emergencyContactRelationship}</div>
            <div className="form-group"><strong>Phone:</strong> {patient.emergencyContactPhone}</div>

            <div className="navigation-buttons">
                <button onClick={goBack}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default ReadOnlyConfirmation;
