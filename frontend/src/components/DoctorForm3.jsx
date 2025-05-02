import React, { useState } from 'react';
import './DoctorForm.css';

function DoctorForm3({ formData, setFormData, setStep }) {
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const { name, email, password, specialization, clinicName, clinicAddress, doctorId } = formData;
        if (!doctorId) {
            setError('Please enter your Doctor ID.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/doctor/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, specialization, clinicName, clinicAddress, doctorId })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
    return (
        <div className="form-page">
            <h2>Doctor Sign Up</h2>
            <p>Final Step: Enter your unique Doctor ID</p>

            <div className="form-group">
                <label>Doctor ID</label>
                <input
                    type="text"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
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

export default DoctorForm3;
