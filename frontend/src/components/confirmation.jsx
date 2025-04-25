// frontend/src/components/Confirmation.jsx
import React from 'react';

function Confirmation({ patientData }) {
        if (!patientData) {
                return <div>No patient data found. Please log in again.</div>;
        }

        return (
            <div className="confirmation">
                    <h2>Welcome, {patientData.name}!</h2>

                    <p><strong>Email:</strong> {patientData.email}</p>
                    <p><strong>Birthday:</strong> {patientData.dob}</p>
                    <p><strong>Gender:</strong> {patientData.gender}</p>
                    <p><strong>Weight:</strong> {patientData.weight} lbs</p>
                    <p><strong>Height:</strong> {patientData.heightFeet}' {patientData.heightInches}"</p>

                    <h3>Medical Info</h3>
                    <p><strong>Symptoms:</strong> {patientData.symptoms}</p>
                    <p><strong>Conditions:</strong> {patientData.conditions}</p>
                    <p><strong>Allergies:</strong> {patientData.allergies}</p>
                    <p><strong>Medications:</strong> {patientData.medications && patientData.medications.join(', ')}</p>

                    <h3>Lifestyle Info</h3>
                    <p><strong>Smoking:</strong> {patientData.smoking}</p>
                    <p><strong>Alcohol:</strong> {patientData.alcohol}</p>
                    <p><strong>Exercise:</strong> {patientData.exercise}</p>
            </div>
        );
}

export default Confirmation;
