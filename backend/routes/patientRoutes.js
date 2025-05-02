import express from 'express';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/search-doctors', async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'Missing name parameter' });

    try {
        const doctors = await Doctor.find({
            name: { $regex: new RegExp(name, 'i') }
        }).select('name email specialization _id');

        res.json({ doctors });
    } catch (err) {
        console.error('Doctor search error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register a new patient
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const existing = await Patient.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });

        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ success: true, patient: newPatient });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const patient = await Patient.findOne({ email });
        if (!patient) return res.status(404).json({ success: false, message: 'No user found' });

        const match = await bcrypt.compare(password, patient.password);
        if (!match) return res.status(401).json({ success: false, message: 'Incorrect password' });

        res.json({ success: true, patient });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update
router.put('/', async (req, res) => {
    const { email, ...updates } = req.body;
    try {
        const patient = await Patient.findOneAndUpdate({ email }, updates, { new: true });
        if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
        res.json({ success: true, patient });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Update error' });
    }
});

// Get a patient's doctors
router.get('/:patientId/doctors', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId).populate('doctors');
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        res.json(patient.doctors);
    } catch (err) {
        console.error('Doctor fetch error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add a doctor to a patient
router.post('/:patientId/add-doctor', async (req, res) => {
    const { doctorId } = req.body;

    try {
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        // Add doctor to patient if not already added
        if (!patient.doctors.includes(doctorId)) {
            patient.doctors.push(doctorId);
            await patient.save();
        }

        //  Add patient to doctor’s list too (this was missing)
        if (!doctor.patients.includes(req.params.patientId)) {
            doctor.patients.push(req.params.patientId);
            await doctor.save();
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error linking doctor and patient:', err);
        res.status(500).json({ error: err.message });
    }
});

// Remove a doctor from a patient
router.delete('/:patientId/remove-doctor/:doctorId', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        patient.doctors = patient.doctors.filter(
            (doc) => doc.toString() !== req.params.doctorId
        );
        await patient.save();

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:patientId/add-doctor', async (req, res) => {
    const { doctorId } = req.body;

    try {
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        // Add doctor to patient's list if not already added
        if (!patient.doctors.includes(doctorId)) {
            patient.doctors.push(doctorId);
            await patient.save();
        }

        // Add patient to doctor's list if not already added
        if (!doctor.patients.includes(patient._id)) {
            doctor.patients.push(patient._id);
            await doctor.save();
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Add doctor error:', err);
        res.status(500).json({ error: err.message });
    }
});






router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        console.error('Get by ID error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});







export default router;
