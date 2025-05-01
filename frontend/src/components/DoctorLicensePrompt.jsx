import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorLicensePrompt({ tempDoctorId, setDoctorId, setStep }) {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!input) {
            setError('Please enter your license number.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/doctor/verify-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tempDoctorId,
                    medicalLicense: Number(input)
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setDoctorId(data.doctorId);
            setStep(12);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-page">
            <h2>Verify Medical License</h2>
            <p>Enter your license number to access your account</p>

            <div className="form-group">
                <label>Medical License Number</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="navigation-buttons">
                <button onClick={handleVerify}>Submit</button>
            </div>
        </div>
    );
}

export default DoctorLicensePrompt;
