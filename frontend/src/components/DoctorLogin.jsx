import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorLogin({ setStep, setTempDoctorId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/doctor/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // ✅ store tempDoctorId for ID prompt
            setTempDoctorId(data.tempDoctorId);
            setStep(25); // Go to Doctor ID verification prompt

        } catch (err) {
            setError(err.message || 'Login failed.');
        }
    };

    return (
        <div className="form-page">
            <h2>Doctor Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="navigation-buttons">
                    <button type="submit">Log In</button>
                    <button type="button" onClick={() => setStep(1)}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default DoctorLogin;
