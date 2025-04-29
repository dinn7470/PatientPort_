// frontend/src/components/MedicalInfo.jsx
import React from 'react';
import './MedicalInfo.css';

function MedicalInfo({ formData, setFormData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMedicationsChange = (e) => {
        const text = e.target.value;
        const medsArray = text.split(',').map((m) => m.trim());

        setFormData((prev) => ({
            ...prev,
            medicationsText: text,
            medications: medsArray, // ✅ Also update array version automatically
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <h2>Medical Information</h2>

            <label>Existing Conditions:</label>
            <textarea
                name="conditions"
                value={formData.conditions || ''}
                onChange={handleChange}
                required
            />

            <label>Allergies:</label>
            <textarea
                name="allergies"
                value={formData.allergies || ''}
                onChange={handleChange}
                required
            />

            <label>Current Medications (comma separated):</label>
            <textarea
                name="medicationsText"
                value={formData.medicationsText || ''}
                onChange={handleMedicationsChange}
                required
            />

            <div className="navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button> {/* ✅ Type=submit so onSubmit runs */}
            </div>
        </form>
    );
}

export default MedicalInfo;
