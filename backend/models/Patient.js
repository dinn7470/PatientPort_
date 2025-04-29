// backend/models/Patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String },
    weight: { type: String },
    height: { type: String },
    gender: { type: String },
    symptoms: { type: String },
    conditions: { type: String },
    allergies: { type: String },
    medications: { type: [String] },

    smoking: { type: String },
    alcohol: { type: String },
    exercise: { type: String },

    // ✅ New fields added:
    securityQuestion: { type: String },
    securityAnswer: { type: String },

    emergencyContactName: { type: String },
    emergencyContactRelationship: { type: String },
    emergencyContactPhone: { type: String },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
