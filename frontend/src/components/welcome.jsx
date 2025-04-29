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

            <div className="emergency-access-button">
                <button
                    onClick={() => setStep(10)} // ✅ Go to EmergencyAccess (step 10)
                    style={{
                        backgroundColor: '#e53935',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        marginTop: '2rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;
