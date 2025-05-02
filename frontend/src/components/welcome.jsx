import React from 'react';
import './Welcome.css';

function Welcome({ goToLogin, goToSignup, goToDoctorLogin, setStep }) {
    return (
        <div className="welcome-page">
            <h2>Welcome to PatientPort</h2>
            <p>Please choose an option to continue:</p>
            <div className="welcome-buttons">
                <button onClick={goToLogin}>Patient Access</button>
                <button onClick={goToSignup}>Sign Up</button>
                <button onClick={goToDoctorLogin} className="doctor-button">Doctor Access</button>
            </div>
            <div style={{marginTop: '1rem'}}>
                <button
                    onClick={() => setStep(10)}
                    className="emergency-button"
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;