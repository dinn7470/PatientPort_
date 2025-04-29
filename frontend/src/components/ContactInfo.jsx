// frontend/src/components/ContactInfo.jsx
import React from 'react';
import './ContactInfo.css';

function ContactInfo({ formData, setFormData, setPatientData, nextStep, prevStep }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { emergencyContactName, emergencyContactRelationship, emergencyContactPhone, password } = formData;

        // Validate emergency contact fields
        if (!emergencyContactName || !emergencyContactRelationship || !emergencyContactPhone) {
            alert('Please fill out all emergency contact fields.');
            return;
        }

        const phoneRegex = /^[0-9\-\s()]+$/;
        if (!phoneRegex.test(emergencyContactPhone)) {
            alert('Please enter a valid phone number format.');
            return;
        }

        if (!password) {
            alert('Password is missing. Please return to the first page to enter a password.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/patient', {
                method: 'POST', // ✅ Ensures backend hashes password
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setPatientData(data.patient);
                nextStep(); // ✅ Go to Confirmation page
            } else {
                alert('Error submitting form: ' + data.message);
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <form className="contact-info-form" onSubmit={handleSubmit}>
            <h2>Emergency Contact Information</h2>

            <label>Emergency Contact Name:</label>
            <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName || ''}
                onChange={handleChange}
                required
            />

            <label>Relationship:</label>
            <input
                type="text"
                name="emergencyContactRelationship"
                value={formData.emergencyContactRelationship || ''}
                onChange={handleChange}
                required
            />

            <label>Emergency Contact Phone:</label>
            <input
                type="text"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone || ''}
                onChange={handleChange}
                placeholder="e.g., (123) 456-7890"
                required
            />

            <div className="contact-navigation-buttons">
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ContactInfo;
