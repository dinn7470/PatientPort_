// backend/index.js
import express from 'express';
import connectDB from './config/mongodb.js';
import patientRoutes from './routes/patientRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js'; //
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/patient', patientRoutes);
app.use('/api/emergency', emergencyRoutes); // 🆕

app.listen(5000, () => {
    console.log(' Server running on port 5000');
});
