// backend/routes/emergencyRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';
import crypto from 'crypto';

const router = express.Router();

// Store active emergency codes temporarily in memory
const activeEmergencyCodes = {};  // { code: { patientId, expiresAt } }

// Route to generate an emergency code
router.post('/generate', async (req, res) => {
    const { name, dob } = req.body;

    try {
        const patient = await Patient.findOne({ name, dob });
        if (!patient) {
            return res.status(404).json({ message: 'No patient found with that name and birthdate' });
        }

        const code = crypto.randomBytes(3).toString('hex');  // Generate 6-char code
        const expiresAt = Date.now() + 10 * 60 * 1000;  // Expires in 10 minutes
        activeEmergencyCodes[code] = { patientId: patient._id.toString(), expiresAt };

        res.json({ success: true, code });
    } catch (error) {
        console.error('Error generating emergency code:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to access patient using emergency code
router.post('/access', async (req, res) => {
    const { code } = req.body;

    const record = activeEmergencyCodes[code];
    if (!record) {
        return res.status(404).json({ message: 'Invalid or expired emergency code' });
    }

    // Check if the code is expired
    if (Date.now() > record.expiresAt) {
        delete activeEmergencyCodes[code];
        return res.status(404).json({ message: 'Emergency code expired' });
    }

    try {
        const patient = await Patient.findById(record.patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Optional: Invalidate code after first use
        delete activeEmergencyCodes[code];

        res.json({ success: true, patient });
    } catch (error) {
        console.error('Error accessing patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;