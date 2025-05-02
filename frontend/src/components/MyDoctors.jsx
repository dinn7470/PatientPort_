import React, { useEffect, useState } from 'react';
import './MyDoctors.css';

function MyDoctors({ patientId, setStep, setSelectedDoctor }) {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    useEffect(() => {
        if (patientId) {
            fetch(`http://localhost:5000/api/patient/${patientId}/doctors`)
                .then(res => res.json())
                .then(setDoctors)
                .catch(err => console.error('Error fetching doctors:', err));
        }
    }, [patientId]);

    useEffect(() => {
        if (searchTerm.trim().length >= 2) {
            fetch(`http://localhost:5000/api/patient/search-doctors?name=${encodeURIComponent(searchTerm)}`)
                .then(res => res.json())
                .then(data => setSearchResults(data.doctors || []))
                .catch(err => console.error('Doctor search error:', err));
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleAddDoctor = async (doctorId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/patient/${patientId}/add-doctor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctorId })
            });

            if (res.ok) {
                const added = searchResults.find(d => d._id === doctorId);
                if (added && !doctors.some(d => d._id === added._id)) {
                    setDoctors(prev => [...prev, added]);
                }
            }
        } catch (err) {
            console.error('Failed to add doctor:', err);
        }
    };

    const confirmDelete = (doctorId) => {
        setPendingDeleteId(doctorId);
        setShowConfirm(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/patient/${patientId}/remove-doctor/${pendingDeleteId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setDoctors(prev => prev.filter(d => d._id !== pendingDeleteId));
                setPendingDeleteId(null);
                setShowConfirm(false);
            } else {
                alert('Failed to delete doctor.');
            }
        } catch (err) {
            console.error('Error deleting doctor:', err);
            alert('Server error while deleting.');
        }
    };

    const handleViewDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setStep(27); // Replace with your actual step for viewing doctor details
    };

    return (
        <div className="form-page">
            <h2>My Doctors</h2>

            {doctors.length === 0 && <p>No doctors added yet.</p>}

            {doctors.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {doctors.map(d => (
                        <tr key={d._id}>
                            <td>{d.name} ({d.specialization || 'N/A'})</td>
                            <td>{d.email}</td>
                            <td><button onClick={() => handleViewDoctor(d)}>View</button></td>
                            <td><button onClick={() => confirmDelete(d._id)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div className="form-group">
                <label>Search for Doctors</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type name..."
                />
            </div>

            {searchResults.length > 0 && (
                <div className="form-group">
                    <h3>Results:</h3>
                    <ul>
                        {searchResults.map(doc => (
                            <li key={doc._id}>
                                {doc.name} ({doc.specialization || 'N/A'}){' '}
                                <button onClick={() => handleAddDoctor(doc._id)}>Add</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to remove this doctor?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowConfirm(false)}>No</button>
                            <button onClick={handleDeleteConfirmed}>Yes</button>
                        </div>
                    </div>
                </div>
            )}

            <button className="back-btn" onClick={() => setStep(8)}>Back to Profile</button>
        </div>
    );
}

export default MyDoctors;
