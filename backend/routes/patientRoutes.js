// backend/routes/patientRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// ✅ Register a new patient
router.post('/', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.json({ success: true, message: 'Patient saved successfully' });
    } catch (error) {
        console.error('Error saving patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Login patient (check email + password)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a patient exists with matching email and password
        const patient = await Patient.findOne({ email, password });

        if (patient) {
            res.json({ success: true, patient });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
