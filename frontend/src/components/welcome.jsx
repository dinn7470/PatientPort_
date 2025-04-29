import React from 'react';
import './Welcome.css';

function Welcome({ goToLogin, goToSignup, setStep }) {
    return (
        <div className="welcome-page">
            <h2>Welcome to PatientPort</h2>
            <p>Access your healthcare information quickly and securely:</p>

            <div className="welcome-buttons">
                <button onClick={goToLogin}>Log In</button>
                <button onClick={goToSignup}>Sign Up</button>
            </div>

            <div className="emergency-access">
                <button
                    onClick={() => setStep(6)} // ✅ NOW takes you to EmergencyAccess.jsx
                    className="emergency-button"
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
