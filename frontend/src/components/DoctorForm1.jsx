import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorForm1({ formData, setFormData, setStep }) {
    const [error, setError] = useState('');

    const handleNext = () => {
        const { name, email, password, specialization } = formData;
        if (!name || !email || !password || !specialization) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');
        setStep(21);
    };

    return (
        <div className="form-page">
            <h2>Doctor Sign Up</h2>
            <p>Step 1: Enter your professional information.</p>

            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Specialization</label>
                <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="navigation-buttons">
                <button onClick={() => setStep(11)}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default DoctorForm1;
