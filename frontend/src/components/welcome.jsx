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
                <button onClick={goToDoctorLogin} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                    Doctor Access
                </button>
            </div>
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={() => setStep(10)}
                    style={{ backgroundColor: '#f44336', color: 'white' }}
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
