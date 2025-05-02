import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: String,
    weight: String,
    heightFeet: String,
    heightInches: String,
    gender: String,
    symptoms: String,
    conditions: String,
    allergies: String,
    medications: [String],
    smoking: String,
    alcohol: String,
    exercise: String,
    emergencyContactName: String,
    emergencyContactRelationship: String,
    emergencyContactPhone: String,
    securityQuestion: String,
    securityAnswer: String,
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

// Hash password before save
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('Patient', patientSchema);
