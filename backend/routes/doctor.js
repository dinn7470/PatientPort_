import express from 'express';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Doctor Signup
router.post('/signup', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            specialization,
            clinicName,
            clinicAddress,
            medicalLicense
        } = req.body;

        const existing = await Doctor.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashed,
            specialization,
            clinicName,
            clinicAddress,
            medicalLicense
        });

        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created', doctor: newDoctor });
    } catch (err) {
        console.error('Signup failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Login Step 1: Email & Password
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(401).json({ error: 'Invalid email' });

    const match = await bcrypt.compare(password, doctor.password);
    if (!match) return res.status(401).json({ error: 'Incorrect password' });

    res.json({ tempDoctorId: doctor._id });
});

// Login Step 2: Verify Medical License
router.post('/verify-license', async (req, res) => {
    const { medicalLicense, tempDoctorId } = req.body;
    const doctor = await Doctor.findById(tempDoctorId);

    if (!doctor || doctor.medicalLicense !== String(medicalLicense)) {
        return res.status(403).json({ error: 'Invalid medical license number' });
    }

    res.json({ doctorId: doctor._id });
});


// Add a patient to a doctor
router.post('/:doctorId/add-patient', async (req, res) => {
    const { patientId } = req.body;
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        if (!doctor.patients.includes(patientId)) {
            doctor.patients.push(patientId);
            await doctor.save();
        }

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all patients linked to a doctor
router.get('/:doctorId/patients', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId).populate('patients');
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        res.json(doctor.patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all doctors (optional utility route)
router.get('/all', async (req, res) => {
    try {
        const doctors = await Doctor.find().select('name specialization clinicName');
        res.json(doctors);
    } catch (err) {
        console.error('Failed to fetch doctors:', err);
        res.status(500).json({ error: 'Failed to retrieve doctors' });
    }
});

// Remove a patient from a doctor's list
router.delete('/:doctorId/remove-patient/:patientId', async (req, res) => {
    const { doctorId, patientId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        doctor.patients = doctor.patients.filter(
            (p) => p.toString() !== patientId
        );
        await doctor.save();

        res.json({ success: true });
    } catch (err) {
        console.error('Error removing patient:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
