import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: String,
    weight: String,
    height: String,
    gender: String,
    symptoms: String,
    conditions: String,
    allergies: String,
    medications: [String],
    smoking: String,
    alcohol: String,
    exercise: String,
    securityQuestion: String,
    securityAnswer: String,
    emergencyContactName: String,
    emergencyContactRelationship: String,
    emergencyContactPhone: String,
});

// ✅ Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
