import React, { useState } from 'react';
import './SecurityQuestion.css';

function SecurityCheckLogin({ formData, setFormData, nextStep }) {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const correctAnswer = formData.correctSecurityAnswer?.toLowerCase().trim();
        const userAnswer = answer.toLowerCase().trim();

        if (userAnswer === correctAnswer) {
            nextStep();
        } else {
            setError('Incorrect security answer.');
        }
    };

    return (
        <form className="security-question-form" onSubmit={handleSubmit}>
            <h2>Security Verification</h2>

            <label>{formData.securityQuestion || 'No question found.'}</label>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="security-navigation-buttons" style={{ justifyContent: 'center' }}>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default SecurityCheckLogin;
