import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorLogin({ setStep, setTempDoctorId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

            setTempDoctorId(data.tempDoctorId);
            setStep(26);
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
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="navigation-buttons">
                    <button type="button" onClick={() => setStep(1)}>Back</button>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default DoctorLogin;
