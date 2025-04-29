import express from 'express';
import Patient from '../models/Patient.js';
import crypto from 'crypto';

const router = express.Router();

// Store active emergency codes temporarily in memory
const activeEmergencyCodes = {};  // { code: { patientId, expiresAt } }

// 🔹 Generate an emergency code based on name and DOB
router.post('/generate', async (req, res) => {
    const { name, dob } = req.body;

    try {
        const patient = await Patient.findOne({ name, dob });
        if (!patient) {
            return res.status(404).json({ message: 'No patient found with that name and birthdate' });
        }

        const code = crypto.randomBytes(3).toString('hex').toUpperCase(); // 🔹 Easier to read
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        activeEmergencyCodes[code] = {
            patientId: patient._id.toString(),
            expiresAt
        };

        res.json({ success: true, code });
    } catch (error) {
        console.error('Error generating emergency code:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// 🔹 Access patient info using emergency code
router.post('/access', async (req, res) => {
    const { code } = req.body;
    const cleanedCode = code.toUpperCase(); // 🔹 Match regardless of lowercase/uppercase

    const record = activeEmergencyCodes[cleanedCode];
    if (!record) {
        return res.status(404).json({ message: 'Invalid or expired emergency code' });
    }

    if (Date.now() > record.expiresAt) {
        delete activeEmergencyCodes[cleanedCode];
        return res.status(404).json({ message: 'Emergency code expired' });
    }

    try {
        const patient = await Patient.findById(record.patientId).lean(); // 🔹 Use lean() for performance
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Optional: remove the code after use
        delete activeEmergencyCodes[cleanedCode];

        // 🔹 Optional: You can trim down what fields are returned
        // Or just send the full patient like you're doing now
        res.json({ success: true, patient });
    } catch (error) {
        console.error('Error accessing patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
