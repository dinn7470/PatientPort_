import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.json({ success: true, message: "Patient saved" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
