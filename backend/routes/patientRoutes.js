import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// POST route to save patient form submission
router.post('/', async (req, res) => {
    try {
        console.log('📨 Incoming form data:', req.body); // Log what's received from frontend

        const newPatient = new Patient(req.body);        // Create new Patient document
        await newPatient.save();                          // Save to MongoDB

        res.json({ success: true, message: 'Patient saved' }); // Respond with success
    } catch (error) {
        console.error('❌ Error saving patient:', error);       // Log any database/save errors
        res.status(500).json({ success: false, message: error.message }); // Send error to frontend
    }
});

// Optional: GET route to list all patients (for testing)
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
});

export default router;
