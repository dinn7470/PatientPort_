// backend/routes/emergencyRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';
import crypto from 'crypto';

const router = express.Router();

// Route to generate emergency code
router.post('/generate', async (req, res) => {
    const { name, dob } = req.body;

    try {
        const patient = await Patient.findOne({ name, dob });
        if (!patient) {
            return res.status(404).json({ message: 'No patient found with that name and birthdate' });
        }

        const code = crypto.randomBytes(3).toString('hex');
        patient.emergencyCode = code;
        await patient.save();

        res.json({ code });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to access patient using emergency code
router.post('/access', async (req, res) => {
    const { code } = req.body;

    try {
        const patient = await Patient.findOne({ emergencyCode: code });
        if (!patient) {
            return res.status(404).json({ message: 'Invalid or expired emergency code' });
        }

        patient.emergencyCode = null; // Invalidate code after use
        await patient.save();

        res.json({ patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
