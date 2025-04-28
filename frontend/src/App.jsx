// frontend/src/App.jsx
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import Login from './components/Login.jsx';
import PatientForm from './components/PatientForm.jsx';
import MedicalInfo from './components/MedicalInfo.jsx';
import LifestyleInfo from './components/LifestyleInfo.jsx';
import EmergencyAccess from './components/EmergencyAccess.jsx';
import Confirmation from './components/Confirmation.jsx';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    const [accessType, setAccessType] = useState('patient');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        weight: '',
        heightFeet: '',
        heightInches: '',
        gender: '',
        symptoms: '',
        medications: [],
        conditions: '',
        allergies: '',
        medicationsText: '',
        smoking: '',
        alcohol: '',
        exercise: ''
    });

    const [patientData, setPatientData] = useState(null);

    // Step Navigation
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const goToLogin = () => setStep(2);
    const goToSignup = () => setStep(3);
    const goBackToWelcome = () => setStep(1);
    const goToEmergency = () => setStep(6);

    return (
        <div className="app-container">

            {step === 1 && (
                <Welcome
                    goToLogin={goToLogin}
                    goToSignup={goToSignup}
                    goToEmergencyAccess={goToEmergency}
                />
            )}

            {step === 2 && (
                <Login
                    formData={formData}
                    setFormData={setFormData}
                    setPatientData={setPatientData}
                    setAccessType={setAccessType}
                    setStep={setStep}
                    goBack={goBackToWelcome}
                />
            )}

            {step === 3 && (
                <PatientForm
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={goBackToWelcome}
                />
            )}

            {step === 4 && (
                <MedicalInfo
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 5 && (
                <LifestyleInfo
                    formData={formData}
                    setFormData={setFormData}
                    prevStep={prevStep}
                    setPatientData={setPatientData}
                    setAccessType={setAccessType}
                    setStep={setStep}
                />
            )}

            {step === 6 && (
                <EmergencyAccess
                    setPatientData={setPatientData}
                    setAccessType={setAccessType}
                    setStep={setStep}
                />
            )}

            {step === 7 && (
                <Confirmation
                    patientData={patientData}
                    setPatientData={setPatientData}
                    accessType={accessType}
                />
            )}
        </div>
    );
}

export default App;
