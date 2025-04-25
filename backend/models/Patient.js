// backend/models/Patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
    weight: Number,
    heightFeet: Number,
    heightInches: Number,
    gender: String,
    symptoms: String,
    medications: [String],
    conditions: String,
    allergies: String,
    smoking: String,
    alcohol: String,
    exercise: String,
    dob: { type: String, required: true }, // 🆕 Add Date of Birth
    emergencyCode: { type: String, default: null } // 🆕 Emergency Code field
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
