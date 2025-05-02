// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    specialization: String,
    clinicName: String,
    clinicAddress: String,
    medicalLicense: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: [] }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
