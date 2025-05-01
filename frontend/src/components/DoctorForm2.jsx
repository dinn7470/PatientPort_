import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorForm2({ formData, setFormData, setStep }) {
    const [error, setError] = useState('');

    const handleNext = () => {
        const { clinicName, clinicAddress } = formData;
        if (!clinicName || !clinicAddress) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');
        setStep(24);
    };

    return (
        <div className="form-page">
            <h2>Doctor Sign Up</h2>
            <p>Step 2: Enter your clinic information.</p>

            <div className="form-group">
                <label>Clinic Name</label>
                <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Clinic Address</label>
                <input
                    type="text"
                    value={formData.clinicAddress}
                    onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="navigation-buttons">
                <button onClick={() => setStep(20)}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default DoctorForm2;
