import React from 'react';
import './SecurityQuestion.css';

function SecurityQuestion({ formData, setFormData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value })); // ✅ Save immediately into formData
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep(); // ✅ Move to ContactInfo step
    };

    return (
        <form className="security-question-form" onSubmit={handleSubmit}>
            <h2>Security Question</h2>

            <label>Security Question:</label>
            <input
                type="text"
                name="securityQuestion"
                value={formData.securityQuestion || ''}
                onChange={handleChange}
                required
            />

            <label>Security Answer:</label>
            <input
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer || ''}
                onChange={handleChange}
                required
            />

            <div className="security-navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
    );
}

export default SecurityQuestion;
