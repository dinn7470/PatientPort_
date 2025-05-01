import React, { useState } from 'react';

function DoctorConfirmation({ formData }) {
    const [patients, setPatients] = useState([]);
    const [searchName, setSearchName] = useState('');

    const handleSearch = async () => {
        const res = await fetch(`http://localhost:5000/api/patient/search?name=${searchName}`);
        const data = await res.json();
        if (res.ok) {
            alert(`Found: ${data.name} (${data.email})`);
        } else {
            alert('No patient found');
        }
    };

    const loadPatients = async () => {
        const res = await fetch(`http://localhost:5000/api/doctor/${formData._id}/patients`);
        const data = await res.json();
        setPatients(data);
    };

    return (
        <div className="doctor-confirmation">
            <h2>Welcome, Dr. {formData.name}</h2>
            <div className="dashboard-buttons">
                <button onClick={loadPatients}>My Patients</button>
                <button onClick={handleSearch}>Add Patients</button>
            </div>
            <input
                type="text"
                placeholder="Search patient by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            {patients.length > 0 && (
                <table>
                    <thead><tr><th>Name</th><th>Email</th></tr></thead>
                    <tbody>
                    {patients.map(p => (
                        <tr key={p._id}><td>{p.name}</td><td>{p.email}</td></tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DoctorConfirmation;
