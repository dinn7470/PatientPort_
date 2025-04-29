import React, { useState } from 'react';
import './EmergencyAccess.css';

function EmergencyAccess({ setPatientData, setStep, setAccessType }) {
    const [step, setLocalStep] = useState(1); // Local step just for this form
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
                body: JSON.stringify({ name, dob })
            });
            const data = await res.json();
            if (data.code) {
                setGeneratedCode(data.code);
                setLocalStep(2);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error generating code:', error);
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
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (data.patient) {
                setPatientData(data.patient);
                setAccessType('emergency');
                setStep(9); // Go to confirmation
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error accessing patient:', error);
            setError('Something went wrong.');
        }
    };

    return (
        <div className="emergency-access">
            {step === 1 && (
                <form onSubmit={handleGenerateCode}>
                    <h2>Generate Emergency Code</h2>
                    <label>Patient Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required/>

                    <label>Patient Birthday:</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required/>

                    <button type="submit">Generate Code</button>
                    <button type="button" onClick={() => setStep(1)} style={{marginLeft: '1rem'}}>
                        ⬅ Back to Welcome
                    </button>

                    {error && <p className="error-message">{error}</p>}
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleAccessPatient}>
                    <h2>Enter Emergency Code</h2>
                    <p>Generated Code: <strong>{generatedCode}</strong></p>

                    <label>Emergency Code:</label>
                    <input value={code} onChange={(e) => setCode(e.target.value)} required />

                    <button type="submit">Access Patient Info</button>
                    <button type="button" onClick={() => setStep(1)} style={{ marginLeft: '1rem' }}>
                        ⬅ Back to Welcome
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </div>
    );
}

export default EmergencyAccess;
