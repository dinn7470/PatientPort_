import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: String,
    clinicName: String,
    clinicAddress: String,
    doctorId: { type: String, required: true, unique: true },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

export default mongoose.model('Doctor', DoctorSchema);
