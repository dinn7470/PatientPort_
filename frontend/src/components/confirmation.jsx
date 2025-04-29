// frontend/src/components/Confirmation.jsx
import React, { useEffect, useState } from 'react';
import './Confirmation.css';

function Confirmation({ formData, patientData, setPatientData, accessType }) {
    const [editData, setEditData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadOrCreatePatient = async () => {
            if (!patientData) {
                try {
                    setIsSubmitting(true);
                    const res = await fetch('http://localhost:5000/api/patient', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setPatientData(data.patient);
                        setEditData(data.patient);
                    } else {
                        console.error('Error creating patient:', data.message);
                    }
                } catch (err) {
                    console.error('Error creating patient:', err);
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                setEditData(patientData);
            }
        };

        loadOrCreatePatient();
    }, [formData, patientData, setPatientData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/patient', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            const data = await res.json();
            if (data.success) {
                setPatientData(data.patient);
                setEditData(data.patient);
                setIsEditing(false);
                alert('Information updated successfully!');
            } else {
                alert('Error updating information.');
            }
        } catch (err) {
            console.error('Update error:', err);
            alert('Something went wrong.');
        }
    };

    if (isSubmitting || !editData) {
        return <div>Loading your information...</div>;
    }

    return (
        <div className="confirmation">
            <h2>Welcome, {editData.name || "N/A"}!</h2>

            {isEditing ? (
                <>
                    <h3>Basic Info</h3>
                    <label>Email:</label>
                    <input name="email" value={editData.email || ''} disabled />

                    <label>Birthday:</label>
                    <input name="dob" value={editData.dob || ''} onChange={handleChange} />

                    <label>Gender:</label>
                    <input name="gender" value={editData.gender || ''} onChange={handleChange} />

                    <label>Weight (lbs):</label>
                    <input name="weight" value={editData.weight || ''} onChange={handleChange} />

                    <label>Height:</label>
                    <input name="height" value={editData.height || ''} onChange={handleChange} />

                    <h3>Medical Info</h3>
                    <label>Symptoms:</label>
                    <input name="symptoms" value={editData.symptoms || ''} onChange={handleChange} />

                    <label>Conditions:</label>
                    <input name="conditions" value={editData.conditions || ''} onChange={handleChange} />

                    <label>Allergies:</label>
                    <input name="allergies" value={editData.allergies || ''} onChange={handleChange} />

                    <label>Medications:</label>
                    <input
                        name="medicationsText"
                        value={editData.medicationsText || ''}
                        onChange={(e) => {
                            const medsArray = e.target.value.split(',').map((m) => m.trim());
                            setEditData((prev) => ({
                                ...prev,
                                medications: medsArray,
                                medicationsText: e.target.value,
                            }));
                        }}
                    />

                    <h3>Lifestyle Info</h3>
                    <label>Smoking:</label>
                    <input name="smoking" value={editData.smoking || ''} onChange={handleChange} />

                    <label>Alcohol:</label>
                    <input name="alcohol" value={editData.alcohol || ''} onChange={handleChange} />

                    <label>Exercise:</label>
                    <input name="exercise" value={editData.exercise || ''} onChange={handleChange} />

                    {/* 🔐 Only show security section if not emergency */}
                    {accessType !== 'emergency' && (
                        <>
                            <h3>Security Question</h3>
                            <label>Security Question:</label>
                            <input name="securityQuestion" value={editData.securityQuestion || ''} onChange={handleChange} />

                            <label>Security Answer:</label>
                            <input name="securityAnswer" value={editData.securityAnswer || ''} onChange={handleChange} />
                        </>
                    )}

                    <h3>Emergency Contact</h3>
                    <label>Contact Name:</label>
                    <input name="emergencyContactName" value={editData.emergencyContactName || ''} onChange={handleChange} />

                    <label>Relationship:</label>
                    <input name="emergencyContactRelationship" value={editData.emergencyContactRelationship || ''} onChange={handleChange} />

                    <label>Phone:</label>
                    <input name="emergencyContactPhone" value={editData.emergencyContactPhone || ''} onChange={handleChange} />

                    <button onClick={handleSubmitClick}>Submit Changes</button>
                </>
            ) : (
                <>
                    <h3>Basic Info</h3>
                    <p><strong>Email:</strong> {editData.email || 'N/A'}</p>
                    <p><strong>Birthday:</strong> {editData.dob || 'N/A'}</p>
                    <p><strong>Gender:</strong> {editData.gender || 'N/A'}</p>
                    <p><strong>Weight:</strong> {editData.weight ? `${editData.weight} lbs` : 'N/A'}</p>
                    <p><strong>Height:</strong> {editData.height || 'N/A'}</p>

                    <h3>Medical Info</h3>
                    <p><strong>Symptoms:</strong> {editData.symptoms || 'N/A'}</p>
                    <p><strong>Conditions:</strong> {editData.conditions || 'N/A'}</p>
                    <p><strong>Allergies:</strong> {editData.allergies || 'N/A'}</p>
                    <p><strong>Medications:</strong> {editData.medications?.join(', ') || 'N/A'}</p>

                    <h3>Lifestyle Info</h3>
                    <p><strong>Smoking:</strong> {editData.smoking || 'N/A'}</p>
                    <p><strong>Alcohol:</strong> {editData.alcohol || 'N/A'}</p>
                    <p><strong>Exercise:</strong> {editData.exercise || 'N/A'}</p>

                    {/* 🔐 Only show security if NOT emergency */}
                    {accessType !== 'emergency' && (
                        <>
                            <h3>Security Question</h3>
                            <p><strong>Question:</strong> {editData.securityQuestion || 'N/A'}</p>
                            <p><strong>Answer:</strong> {editData.securityAnswer || 'N/A'}</p>
                        </>
                    )}

                    <h3>Emergency Contact</h3>
                    <p><strong>Name:</strong> {editData.emergencyContactName || 'N/A'}</p>
                    <p><strong>Relationship:</strong> {editData.emergencyContactRelationship || 'N/A'}</p>
                    <p><strong>Phone:</strong> {editData.emergencyContactPhone || 'N/A'}</p>

                    {/* 🛑 Hide Edit for EMTs */}
                    {accessType !== 'emergency' && <button onClick={handleEditClick}>Edit</button>}
                </>
            )}
        </div>
    );
}

export default Confirmation;
