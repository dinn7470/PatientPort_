import express from 'express';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Sign up doctor
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, specialization, clinicName, clinicAddress, doctorId } = req.body;
        const existing = await Doctor.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ name, email, password: hashed, specialization, clinicName, clinicAddress, doctorId });
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor created', doctor: newDoctor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login step 1: verify email + password
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(401).json({ error: 'Invalid email' });

    const match = await bcrypt.compare(password, doctor.password);
    if (!match) return res.status(401).json({ error: 'Incorrect password' });

    res.json({ tempDoctorId: doctor._id });
});

// Login step 2: verify doctorId
router.post('/verify-id', async (req, res) => {
    const { doctorId, tempDoctorId } = req.body;
    const doctor = await Doctor.findById(tempDoctorId);
    if (!doctor || doctor.doctorId !== doctorId) return res.status(403).json({ error: 'Invalid Doctor ID' });

    res.json({ doctorId: doctor._id, name: doctor.name });
});

export default router;
