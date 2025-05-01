import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorIDPrompt({ tempDoctorId, setDoctorId, setStep }) {
    const [inputId, setInputId] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!inputId) {
            setError('Please enter your Doctor ID number.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/doctor/verify-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctorId: inputId, tempDoctorId })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setDoctorId(data.doctorId);
            setStep(100); // Proceed to dashboard
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-page">
            <h2>Verify Doctor ID</h2>
            <p>Please enter your registered Doctor ID to continue</p>

            <div className="form-group">
                <label>Doctor ID</label>
                <input
                    type="text"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="navigation-buttons">
                <button onClick={handleVerify}>Submit</button>
            </div>
        </div>
    );
}

export default DoctorIDPrompt;
