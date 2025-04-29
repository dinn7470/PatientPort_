// frontend/src/App.jsx
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import Login from './components/Login.jsx';
import PatientForm from './components/PatientForm.jsx';
import MedicalInfo from './components/MedicalInfo.jsx';
import LifestyleInfo from './components/LifestyleInfo.jsx';
import Confirmation from './components/Confirmation.jsx';
import EmergencyAccess from './components/EmergencyAccess.jsx';
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
        exercise: '',
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
        <>
            <header className="app-header">
                <h1>Patient Portal</h1>
            </header>

            <main className="app-main">
                <div className="app-container">
                    {step === 1 && (
                        <Welcome
                            goToLogin={goToLogin}
                            goToSignup={goToSignup}
                            goToEmergency={goToEmergency}
                        />
                    )}

                    {step === 2 && (
                        <Login
                            formData={formData}
                            setFormData={setFormData}
                            setPatientData={setPatientData}
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
                        <EmergencyAccess />
                    )}

                    {step === 7 && (
                        <Confirmation
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={accessType}
                        />
                    )}

                    {/* Fallback if step is invalid */}
                    {(step < 1 || step > 7) && (
                        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
                            <h2>Oops! Something went wrong.</h2>
                            <button onClick={goBackToWelcome}>Return to Home</button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="app-footer">
                <p>© 2025 Patient Portal. All rights reserved.</p>
            </footer>
        </>
    );
}

export default App;
