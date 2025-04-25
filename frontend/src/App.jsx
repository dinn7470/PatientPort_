import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import Login from './components/Login.jsx';
import PatientInfo from './components/PatientForm.jsx';
import MedicalInfo from './components/MedicalInfo.jsx';
import LifestyleInfo from './components/LifestyleInfo.jsx';
import Confirmation from './components/Confirmation.jsx';
import EmergencyAccess from './components/EmergencyAccess.jsx'; // ✅ NEW
import './App.css';

function App() {
    const [step, setStep] = useState(1);

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


    // Navigation functions
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const goToLogin = () => setStep(2);
    const goToSignup = () => setStep(3);
    const goBackToWelcome = () => setStep(1);
    const goToEmergencyAccess = () => setStep(7); // ✅ NEW

    // Dummy login (can replace with real login later)
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with:', formData.email, formData.password);
        alert('Logged in (dummy action)');
    };

    return (
        <div className="app-container">
            <h1>Patient Intake Form</h1>

            {step === 1 && (
                <Welcome
                    goToLogin={goToLogin}
                    goToSignup={goToSignup}
                    goToEmergencyAccess={goToEmergencyAccess} // ✅ NEW
                />
            )}

            {step === 2 && (
                <Login
                    formData={formData}
                    setFormData={setFormData}
                    handleLogin={handleLogin}
                    goBack={goBackToWelcome}
                />
            )}

            {step === 3 && (
                <PatientInfo
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
                    nextStep={nextStep}
                />
            )}

            {step === 6 && (
                <Confirmation
                    formData={formData}
                />
            )}

            {step === 7 && (
                <EmergencyAccess />
            )}
        </div>
    );
}

export default App;
