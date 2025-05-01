import express from 'express';
import Patient from '../models/Patient.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// ✅ Register a new patient
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        const existing = await Patient.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const newPatient = new Patient(req.body); // password will be hashed in schema
        await newPatient.save();

        res.status(201).json({ success: true, message: 'Patient registered', patient: newPatient });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ✅ Log in a patient
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'No user found with that email' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        res.json({ success: true, patient });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ✅ Update patient info
router.put('/', async (req, res) => {
    const { email, ...updates } = req.body;

    try {
        const patient = await Patient.findOneAndUpdate(
            { email },
            updates,
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        res.json({ success: true, patient });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ success: false, message: 'Server error during update' });
    }
});

export default router;
