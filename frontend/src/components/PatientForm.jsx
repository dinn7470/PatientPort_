// This is Step 1: PatientInfo.jsx
import React from 'react';

function PatientInfo({ formData, setFormData, nextStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="patient-form">
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />

            <label>Weight:</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

            <label>Height:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <select name="heightFeet" value={formData.heightFeet} onChange={handleChange} required>
                    <option value="">Feet</option>
                    {[3, 4, 5, 6, 7, 8].map(ft => <option key={ft} value={ft}>{ft}</option>)}
                </select>

                <select name="heightInches" value={formData.heightInches} onChange={handleChange} required>
                    <option value="">Inches</option>
                    {[...Array(12).keys()].map(inch => <option key={inch} value={inch}>{inch}</option>)}
                </select>
            </div>

            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>

            <button type="submit">Next</button>
        </form>
    );
}

export default PatientInfo;
