import React, { useEffect, useState } from 'react';

function DoctorDashboard({ doctorId }) {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctor/${doctorId}/patients`)
            .then(res => res.json())
            .then(setPatients);

        fetch(`http://localhost:5000/api/doctor/${doctorId}/appointments`)
            .then(res => res.json())
            .then(setAppointments);
    }, [doctorId]);

    return (
        <div className="doctor-dashboard">
            <h2>My Patients</h2>
            <ul>
                {patients.map(p => (
                    <li key={p._id}>{p.name} - {p.email}</li>
                ))}
            </ul>

            <h2>Recent Appointments</h2>
            <ul>
                {appointments.map(a => (
                    <li key={a._id}>
                        {a.patientId.name}: {a.status} on {new Date(a.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DoctorDashboard;
