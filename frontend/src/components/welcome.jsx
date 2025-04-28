import React from 'react';

function Welcome({ goToLogin, goToSignup, goToEmergencyAccess }) {
    return (
        <div className="welcome-page">
            <h2>Welcome to PatientPort</h2>
            <p>Please choose an option to continue:</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={goToLogin}>Log In</button>
                <button onClick={goToSignup}>Sign Up</button>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={goToEmergencyAccess}
                    style={{ backgroundColor: '#f44336', color: 'white' }}
                >
                    🚑 EMT Emergency Access
                </button>
            </div>
        </div>
    );
}

export default Welcome;