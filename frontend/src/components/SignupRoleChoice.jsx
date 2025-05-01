import React from 'react';

function SignupRoleChoice({ setStep }) {
    return (
        <div className="signup-role-choice">
            <h2>Sign Up As</h2>
            <div className="signup-buttons">
                <button onClick={() => setStep(3)}>Patient</button>
                <button onClick={() => setStep(20)}>Doctor</button>
            </div>
            <div className="login-buttons" style={{ marginTop: '1rem' }}>
                <button type="button" onClick={() => setStep(1)}>Back</button>
            </div>
        </div>
    );
}

export default SignupRoleChoice;
