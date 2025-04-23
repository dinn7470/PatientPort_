import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}/healthcare`)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ DB connection failed:", err));

app.use('/api/patient', patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
