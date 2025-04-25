// components/Login.jsx
import React from 'react';

function Login({ formData, setFormData, handleLogin, goBack }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
