import React, { useState } from 'react';
import './Login.css';

function Login({ formData, setFormData, setPatientData, setStep, goBack }) {
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/patient/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (data.success) {
                // ✅ Save patient to state (but not yet final)
                setPatientData(data.patient);
                setFormData((prev) => ({
                    ...prev,
                    securityQuestion: data.patient.securityQuestion,
                    correctSecurityAnswer: data.patient.securityAnswer // not shown, only for comparison
                }));
                setStep(3); // ➡ Go to security question screen
            } else {
                setError('Login failed: ' + data.message);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h2>Log In</h2>

            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
            />

            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                required
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="login-buttons">
                <button type="button" onClick={goBack}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
    );
}

export default Login;
