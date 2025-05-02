import React from 'react';
import './Confirmation.css';

function DoctorReadOnlyConfirmation({ selectedDoctor, setStep }) {
    if (!selectedDoctor) {
        return <p>No doctor selected.</p>;
    }

    const { name, email, specialization, clinicName, clinicAddress, medicalLicense } = selectedDoctor;

    return (
        <div className="form-page">
            <h2>Doctor Profile</h2>

            <div className="form-group">
                <label>Name:</label>
                <p>{name}</p>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <p>{email}</p>
            </div>

            <div className="form-group">
                <label>Specialization:</label>
                <p>{specialization || 'N/A'}</p>
            </div>

            <div className="form-group">
                <label>Clinic Name:</label>
                <p>{clinicName || 'N/A'}</p>
            </div>

            <div className="form-group">
                <label>Clinic Address:</label>
                <p>{clinicAddress || 'N/A'}</p>
            </div>

            <div className="form-group">
                <label>Medical License #:</label>
                <p>{medicalLicense}</p>
            </div>

            <button className="back-to-doctors" onClick={() => setStep(14)}>Back to My Doctors</button>
        </div>
    );
}

export default DoctorReadOnlyConfirmation;
