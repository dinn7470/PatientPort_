// backend/routes/patientRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// ✅ Register a new patient
router.post('/', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ success: true, message: 'Patient saved successfully', patient: newPatient });
    } catch (error) {
        console.error('Error saving patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Login patient (check email + password)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
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

// ✅ Update patient by _id (Fixed and expanded)
router.put('/', async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, message: '_id is required to update patient.' });
        }

        const updates = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            symptoms: req.body.symptoms,
            conditions: req.body.conditions,
            allergies: req.body.allergies,
            medications: req.body.medications,
            smoking: req.body.smoking,
            alcohol: req.body.alcohol,
            exercise: req.body.exercise,
            securityQuestion: req.body.securityQuestion,
            securityAnswer: req.body.securityAnswer,
            emergencyContactName: req.body.emergencyContactName,
            emergencyContactRelationship: req.body.emergencyContactRelationship,
            emergencyContactPhone: req.body.emergencyContactPhone,
        };

        const updatedPatient = await Patient.findByIdAndUpdate(_id, updates, { new: true });

        if (!updatedPatient) {
            return res.status(404).json({ success: false, message: 'Patient not found.' });
        }

        res.json({ success: true, patient: updatedPatient });
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
