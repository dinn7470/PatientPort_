// This is Step 5: LifestyleInfo.jsx
import React from 'react';

function LifestyleInfo({ formData, setFormData, prevStep, nextStep }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullFormData = {
            ...formData,
            height: `${formData.heightFeet}'${formData.heightInches}"`
        };

        try {
            const res = await fetch('http://localhost:5000/api/patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullFormData)
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Form submitted successfully!');
                nextStep(); // Move to Confirmation page
            } else {
                alert('⚠️ Error submitting form: ' + data.message);
            }
        } catch (err) {
            console.error(' Submit error:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <h2>Lifestyle Information</h2>

            <label>Smoking Status:</label>
            <select name="smoking" value={formData.smoking || ''} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="never">Never</option>
                <option value="former">Former</option>
                <option value="current">Current</option>
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default LifestyleInfo;
