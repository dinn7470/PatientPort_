import React from 'react';

function Confirmation({ formData }) {
    return (
        <div className="confirmation-page">
            <h2>Submission Summary</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Weight:</strong> {formData.weight}</p>
            <p><strong>Height:</strong> {formData.heightFeet}'{formData.heightInches}"</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Symptoms:</strong> {formData.symptoms}</p>
            <p><strong>Medications:</strong> {formData.medications.join(', ')}</p>
            <p><strong>Conditions:</strong> {formData.conditions}</p>
            <p><strong>Allergies:</strong> {formData.allergies}</p>
            <p><strong>Medications Text:</strong> {formData.medicationsText}</p>
            <p><strong>Smoking:</strong> {formData.smoking}</p>
            <p><strong>Alcohol:</strong> {formData.alcohol}</p>
            <p><strong>Exercise:</strong> {formData.exercise}</p>

            <p>✅ Your information has been submitted and saved!</p>
        </div>
    );
}

export default Confirmation;
