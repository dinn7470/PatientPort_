import React, { useEffect, useState } from 'react';
import './DoctorForm.css';

function DoctorDashboard({ doctorId, setStep, setSelectedPatient }) {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctor/${doctorId}/patients`)
            .then(res => res.json())
            .then(setPatients)
            .catch(err => console.error('Error fetching patients:', err));
    }, [doctorId]);

    const handleView = async (patientId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/patient/${patientId}`);
            if (!res.ok) throw new Error('Patient not found');
            const data = await res.json();
            setSelectedPatient(data);
            setStep(13); // Read-only confirmation
        } catch (err) {
            console.error('Error loading patient data:', err);
            alert('Something went wrong while loading patient info.');
        }
    };

    return (
        <div className="form-page">
            <h2>Doctor Dashboard</h2>

            <h3>My Patients</h3>
            {patients.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.email}</td>
                            <td>
                                <button onClick={() => handleView(p._id)}>View</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No patients assigned yet.</p>
            )}

            <button className="back-btn" onClick={() => setStep(1)}>Return to Welcome Screen</button>
        </div>
    );
}

export default DoctorDashboard;
