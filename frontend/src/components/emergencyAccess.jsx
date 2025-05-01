import React, { useState } from 'react';
import './EmergencyAccess.css';

function EmergencyAccess({ setPatientData, setAccessType, setStep }) {
    const [localStep, setLocalStep] = useState(1);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [code, setCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    const handleGenerateCode = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/emergency/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dob }),
            });
            const data = await res.json();
            if (res.ok) {
                setGeneratedCode(data.code);
                setLocalStep(2); // ✅ this was the conflicting variable
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    const handleAccessPatient = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/emergency/access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if (res.ok) {
                setPatientData(data.patient);
                setAccessType('emergency');
                setStep(8); // Go to confirmation page
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to retrieve patient.');
        }
    };

    return (
        <div className="emergency-access">
            {localStep === 1 && (
                <form onSubmit={handleGenerateCode}>
                    <h2>Generate Emergency Code</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <button type="submit">Generate Code</button>
                </form>
            )}

            {localStep === 2 && (
                <form onSubmit={handleAccessPatient}>
                    <h2>Enter Code</h2>
                    <p>Code: <strong>{generatedCode}</strong></p>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <button type="submit">Access Patient Info</button>
                </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default EmergencyAccess;
