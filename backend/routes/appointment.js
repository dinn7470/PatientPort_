import express from 'express';
import Appointment from '../models/Appointment.js';


const router = express.Router();

//  1. Create new appointment (used by patient)
router.post('/create', async (req, res) => {
    try {
        const { doctorId, patientId, date } = req.body;

        const appointment = new Appointment({
            doctorId,
            patientId,
            date: date ? new Date(date) : new Date()
        });

        await appointment.save();
        res.status(201).json({ success: true, appointment });
    } catch (err) {
        console.error(' Error creating appointment:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Get all appointments for a specific patient
router.get('/patient/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.id })
            .populate('doctorId', 'name specialization clinicName');

        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get('/doctor/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.id })
            .populate('patientId', 'name email');

        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({ success: true, appointment: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


import Doctor from '../models/Doctor.js'; // or correct path if different


router.get('/search-doctors', async (req, res) => {
    const nameQuery = req.query.name;
    try {
        const doctors = await Doctor.find({
            name: { $regex: new RegExp(nameQuery, 'i') }
        }).select('-password'); // Don’t return password hashes
        res.json(doctors);
    } catch (err) {
        console.error('Doctor search error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
