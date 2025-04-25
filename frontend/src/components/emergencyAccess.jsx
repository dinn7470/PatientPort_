// frontend/src/components/EmergencyAccess.jsx
import React, { useState } from 'react';

function EmergencyAccess() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [code, setCode] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    const handleGenerateCode = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/emergency/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dob })
            });
            const data = await res.json();
            if (data.code) {
                setGeneratedCode(data.code);
                setStep(2);
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
        try {
            const res = await fetch('http://localhost:5000/api/emergency/access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (data.patient) {
                setPatientData(data.patient);
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
                    <input value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Patient Birthday:</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

                    <button type="submit">Generate Code</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}

            {step === 2 && !patientData && (
                <form onSubmit={handleAccessPatient}>
                    <h2>Enter Emergency Code</h2>
                    <p>Generated Code: <strong>{generatedCode}</strong> (provide this to EMT)</p>

                    <label>Emergency Code:</label>
                    <input value={code} onChange={(e) => setCode(e.target.value)} required />

                    <button type="submit">Access Patient Info</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}

            {patientData && (
                <div className="patient-info" style={{ marginTop: '2rem' }}>
                    <h2>Patient Information</h2>
                    <p><strong>Name:</strong> {patientData.name}</p>
                    <p><strong>Email:</strong> {patientData.email}</p>
                    <p><strong>Birthday:</strong> {patientData.dob}</p>
                    <p><strong>Gender:</strong> {patientData.gender}</p>
                    <p><strong>Weight:</strong> {patientData.weight} lbs</p>
                    <p><strong>Height:</strong> {patientData.heightFeet}' {patientData.heightInches}"</p>

                    <h3>Medical Info:</h3>
                    <p><strong>Symptoms:</strong> {patientData.symptoms}</p>
                    <p><strong>Known Conditions:</strong> {patientData.conditions}</p>
                    <p><strong>Allergies:</strong> {patientData.allergies}</p>
                    <p><strong>Medications:</strong> {patientData.medications && patientData.medications.join(', ')}</p>

                    <h3>Lifestyle Info:</h3>
                    <p><strong>Smoking:</strong> {patientData.smoking}</p>
                    <p><strong>Alcohol:</strong> {patientData.alcohol}</p>
                    <p><strong>Exercise:</strong> {patientData.exercise}</p>
                </div>
            )}
        </div>
    );
}

export default EmergencyAccess;
