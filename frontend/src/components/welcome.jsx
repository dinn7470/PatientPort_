import React from 'react';
import './Welcome.css';

function Welcome({ goToLogin, goToSignup, setStep }) {
    return (
        <div className="welcome-page">
            <h2>Welcome to PatientPort</h2>
            <p>Where access to healthcare information is provided quickly and securely</p>

            <div className="welcome-buttons">
                <button onClick={goToLogin}>Log In</button>
                <button onClick={goToSignup}>Sign Up</button>
            </div>

            <div className="emergency-access-button">
                <button
                    onClick={() => setStep(10)} // Go to EmergencyAccess (step 10)
                    className="emergency-button"
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
