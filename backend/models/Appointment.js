import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: Date,
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
    notes: String
});

export default mongoose.model('Appointment', AppointmentSchema);
