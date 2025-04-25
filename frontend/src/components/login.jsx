// components/Login.jsx
import React from 'react';

function Login({ formData, setFormData, setPatientData, setStep, goBack }) {
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
                setPatientData(data.patient); // Save the patient data into state
                setStep(7); // Go to Confirmation/Profile page
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Something went wrong.');
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={goBack}>Back</button>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default Login;
