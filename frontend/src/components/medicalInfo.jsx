// This is Step 2: MedicalInfo.jsx
import React from 'react';
import './MedicalInfo.css';

function MedicalInfo({ formData, setFormData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            nextStep();
        }} className="patient-form">
            <label>Existing Conditions:</label>
            <textarea name="conditions" value={formData.conditions || ''} onChange={handleChange}/>

            <label>Allergies:</label>
            <textarea name="allergies" value={formData.allergies || ''} onChange={handleChange}/>

            <label>Current Medications:</label>
            <textarea name="medicationsText" value={formData.medicationsText || ''} onChange={handleChange}/>

            <div className="medical-navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button>
            </div>

        </form>
    );
}

export default MedicalInfo