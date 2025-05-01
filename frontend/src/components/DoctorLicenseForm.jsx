import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorLicenseForm({ formData, setFormData, setStep, setDoctorId }) {
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!formData.medicalLicense) {
            setError('Please enter your medical license number.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/doctor/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setDoctorId(data.doctor._id); // store logged-in doctor ID
            setStep(12); // go to dashboard
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-page">
            <h2>Doctor Sign Up</h2>
            <p>Final Step: Enter your medical license number</p>

            <div className="form-group">
                <label>Medical License Number</label>
                <input
                    type="text"
                    value={formData.medicalLicense || ''}
                    onChange={(e) =>
                        setFormData({ ...formData, medicalLicense: Number(e.target.value) })
                    }
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="navigation-buttons">
                <button onClick={() => setStep(21)}>Back</button>
                <button onClick={handleSubmit}>Create Account</button>
            </div>
        </div>
    );
}

export default DoctorLicenseForm;
