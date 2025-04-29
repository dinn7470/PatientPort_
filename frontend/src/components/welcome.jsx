import React from 'react';
import './Welcome.css';

function Welcome({ goToLogin, goToSignup, goToEmergency }) {
    return (
        <div className="welcome-page">
            <h2>Welcome to PatientPort</h2>
            <p>Please choose an option to continue:</p>

            <div className="welcome-buttons">
                <button onClick={goToLogin}>Log In</button>
                <button onClick={goToSignup}>Sign Up</button>
            </div>

            <div className="emergency-container">
                <button
                    onClick={goToEmergency}
                    className="emergency-button"
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
