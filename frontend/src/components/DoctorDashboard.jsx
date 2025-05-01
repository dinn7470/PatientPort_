import React, { useEffect, useState } from 'react';
import './DoctorForm.css';

function DoctorDashboard({ doctorId, setStep, setSelectedPatient }) {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctor/${doctorId}/patients`)
            .then(res => res.json())
            .then(setPatients)
            .catch(err => console.error('Error fetching patients:', err));
    }, [doctorId]);

    const handleSearch = async (value) => {
        setSearch(value);
        if (value.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/patient/search?name=${value}`);
            const data = await res.json();
            setSearchResults(data);
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    const handleAddPatient = async (patientId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/doctor/${doctorId}/add-patient`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId })
            });

            if (res.ok) {
                const newPatient = searchResults.find(p => p._id === patientId);
                if (newPatient && !patients.some(p => p._id === newPatient._id)) {
                    setPatients(prev => [...prev, newPatient]);
                }
            }
        } catch (err) {
            console.error('Failed to add patient:', err);
        }
    };

    return (
        <div className="form-page">
            <h2>Doctor Dashboard</h2>

            <div className="form-group">
                <label>Search for Patients (min 2 letters)</label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by name"
                />
            </div>

            {searchResults.length > 0 && (
                <div className="form-group">
                    <h3>Results:</h3>
                    <ul>
                        {searchResults.map(p => (
                            <li key={p._id}>
                                {p.name} ({p.email}){' '}
                                <button onClick={() => handleAddPatient(p._id)}>Add</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h3>My Patients</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th><th>Email</th><th>View</th>
                </tr>
                </thead>
                <tbody>
                {patients.map(p => (
                    <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>
                            <button onClick={() => {
                                setSelectedPatient(p);
                                setStep(13);
                            }}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorDashboard;
