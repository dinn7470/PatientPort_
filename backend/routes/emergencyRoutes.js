import express from 'express';
import Patient from '../models/Patient.js';
import crypto from 'crypto';

const router = express.Router();
const activeEmergencyCodes = {};

router.post('/generate', async (req, res) => {
    const { name, dob } = req.body;
    const normalizedDOB = new Date(dob).toISOString().split('T')[0];

    try {
        const patient = await Patient.findOne({ name, dob: normalizedDOB });
        if (!patient) return res.status(404).json({ message: 'No patient found' });

        const code = crypto.randomBytes(3).toString('hex').toUpperCase();
        const expiresAt = Date.now() + 10 * 60 * 1000;

        activeEmergencyCodes[code] = { patientId: patient._id.toString(), expiresAt };
        res.json({ success: true, code });
    } catch (err) {
        console.error('Generate error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/access', async (req, res) => {
    const { code } = req.body;
    const cleanedCode = code.toUpperCase();

    const record = activeEmergencyCodes[cleanedCode];
    if (!record) return res.status(404).json({ message: 'Invalid or expired code' });

    if (Date.now() > record.expiresAt) {
        delete activeEmergencyCodes[cleanedCode];
        return res.status(404).json({ message: 'Code expired' });
    }

    try {
        const patient = await Patient.findById(record.patientId).lean();
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        delete activeEmergencyCodes[cleanedCode];
        res.json({ success: true, patient });
    } catch (err) {
        console.error('Access error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
