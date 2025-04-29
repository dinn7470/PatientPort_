// frontend/src/components/LifestyleInfo.jsx
import React from 'react';
import './LifestyleInfo.css';

function LifestyleInfo({ formData, setFormData, prevStep, nextStep }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep(); // Just move to next step — no database yet
    };

    return (
        <form onSubmit={handleSubmit} className="lifestyle-form">
            <h2>Lifestyle Information</h2>

            <label>Smoking Status:</label>
            <select name="smoking" value={formData.smoking || ''} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="never">Never</option>
                <option value="former">Former Smoker</option>
                <option value="current">Current Smoker</option>
            </select>

            <label>Alcohol Consumption:</label>
            <select name="alcohol" value={formData.alcohol || ''} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="none">None</option>
                <option value="moderate">Moderate</option>
                <option value="frequent">Frequent</option>
            </select>

            <label>Exercise Frequency:</label>
            <input
                name="exercise"
                value={formData.exercise || ''}
                onChange={handleChange}
                required
            />

            <div className="lifestyle-navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button> {/*  Proper type="submit" */}
            </div>
        </form>
    );
}

export default LifestyleInfo;
