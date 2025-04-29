// backend/routes/patientRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

//  Register a new patient (hash password)
// backend/routes/patientRoutes.js
router.post('/', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            ...rest,
            password: hashedPassword
        });

        await newPatient.save();

        // ✅ Optional: Hide password before sending back
        const { password: _, ...patientWithoutPassword } = newPatient.toObject();
        res.status(201).json({ success: true, message: 'Patient saved successfully', patient: patientWithoutPassword });

    } catch (error) {
        console.error('Error saving patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});


//  Login patient (check email then bcrypt compare password)
// Login patient with hashed password check

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email });

        if (!patient) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        // ✅ Optional: Hide password before sending back
        const { password: _, ...patientWithoutPassword } = patient.toObject();
        res.json({ success: true, patient: patientWithoutPassword });

    } catch (error) {
        console.error('Error logging in patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});


//  Update patient by _id (no password rehash unless needed)
router.put('/', async (req, res) => {
    try {
        const { _id, password, ...updates } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, message: '_id is required to update patient.' });
        }

        if (password) {
            // If password is updated, re-hash it
            updates.password = await bcrypt.hash(password, 10);
        }

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
