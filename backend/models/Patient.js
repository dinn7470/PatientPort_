import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
    securityQuestion: { type: String },
    securityAnswer: { type: String },
    emergencyContactName: { type: String },
    emergencyContactRelationship: { type: String },
    emergencyContactPhone: { type: String },
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


// Search for patient by name (exact match)
router.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        const patient = await Patient.findOne({ name });
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});








const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
