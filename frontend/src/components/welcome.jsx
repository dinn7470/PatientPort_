// frontend/src/components/Welcome.jsx
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

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={goToEmergency}
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
