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

        if (!formData.emergencyContactName || !formData.emergencyContactRelationship || !formData.emergencyContactPhone) {
            alert('Please fill out all emergency contact fields.');
            return;
        }

        const phoneRegex = /^[0-9\-\s()]+$/;
        if (!phoneRegex.test(formData.emergencyContactPhone)) {
            alert('Please enter a valid phone number format.');
            return;
        }

        // 🛠 Log the formData before sending it
        console.log(' FORMDATA BEING SENT TO BACKEND:', formData);

        try {
            const res = await fetch('http://localhost:5000/api/patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setPatientData(data.patient); // Save real patient
                nextStep(); //  Go to Confirmation
            } else {
                alert('Error submitting form');
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
