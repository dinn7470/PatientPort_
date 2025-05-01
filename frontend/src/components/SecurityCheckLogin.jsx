import React, { useState } from 'react';
import './SecurityQuestion.css';

function SecurityCheckLogin({ formData, setFormData, nextStep }) {
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.securityAnswer?.trim().toLowerCase() === formData.correctSecurityAnswer?.trim().toLowerCase()) {
            nextStep(); // → Step 8: Confirmation page
        } else {
            setError('Incorrect security answer.');
        }
    };

    return (
        <form className="security-question-form" onSubmit={handleSubmit}>
            <h2>Security Check</h2>

            <label>{formData.securityQuestion || 'Security Question'}:</label>
            <input
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer || ''}
                onChange={handleChange}
                required
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="security-navigation-buttons">
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default SecurityCheckLogin;
