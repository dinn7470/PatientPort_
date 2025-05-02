import React from 'react';
import './SignupRoleChoice.css';

function SignupRoleChoice({ setStep }) {
    return (
        <div className="signup-container">
            <h2 className="signup-title">Sign Up As</h2>

            <div className="button-group">
                <button className="role-btn1" onClick={() => setStep(3)}>Patient</button>
                <button className="role-btn2" onClick={() => setStep(20)}>Doctor</button>
            </div>

            <button className="back-btn" onClick={() => setStep(1)}>Back</button>
        </div>
    );
}

export default SignupRoleChoice;
