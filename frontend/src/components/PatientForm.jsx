import React, { useState } from 'react';
import './PatientForm.css';

function PatientForm({ formData, setFormData, nextStep, prevStep }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedHeight = `${formData.heightFeet || 0}'${formData.heightInches || 0}"`;

        setFormData((prev) => ({
            ...prev,
            height: combinedHeight,
        }));

        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <h2>Patient Information</h2>

            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
            />

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
            />

            <label>Password:</label>
            <div className="password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    required
                />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>

            <label>Birthday:</label>
            <input
                type="date"
                name="dob"
                value={formData.dob || ''}
                onChange={handleChange}
                required
            />

            <label>Weight (lbs):</label>
            <input
                type="number"
                name="weight"
                value={formData.weight || ''}
                onChange={handleChange}
                required
            />

            <label>Height:</label>
            <div className="height-container">
                <select
                    name="heightFeet"
                    value={formData.heightFeet || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Feet</option>
                    {[3, 4, 5, 6, 7, 8].map((ft) => (
                        <option key={ft} value={ft}>{ft}</option>
                    ))}
                </select>

                <select
                    name="heightInches"
                    value={formData.heightInches || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Inches</option>
                    {[...Array(12).keys()].map((inch) => (
                        <option key={inch} value={inch}>{inch}</option>
                    ))}
                </select>
            </div>

            <label>Gender:</label>
            <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                required
            >
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>

            <div className="navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
    );
}

export default PatientForm;
