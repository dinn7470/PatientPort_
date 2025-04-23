import { useState } from 'react';

function PatientForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        symptoms: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <label>Name:</label>
            <input name="name" onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" onChange={handleChange} required />

            <label>Gender:</label>
            <select name="gender" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>

            <label>Symptoms:</label>
            <textarea name="symptoms" onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    );
}

export default PatientForm;
