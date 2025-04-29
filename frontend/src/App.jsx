import { useState } from 'react';
import PatientForm from './components/PatientForm';
import MedicalInfo from './components/MedicalInfo';
import LifestyleInfo from './components/LifestyleInfo';
import SecurityQuestion from './components/SecurityQuestion';
import ContactInfo from './components/ContactInfo';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import Welcome from './components/welcome';
import EmergencyAccess from './components/EmergencyAccess';
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
        conditions: '',
        allergies: '',
        medications: [],
        medicationsText: '',
        smoking: '',
        alcohol: '',
        exercise: '',
        securityQuestion: '',
        securityAnswer: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
    });

    const [patientData, setPatientData] = useState(null);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const goToLogin = () => setStep(2);
    const goToSignup = () => setStep(3);
    const goBackToWelcome = () => setStep(1);

    return (
        <>
            <header className="app-header">
                <h1>PatientPort</h1>
            </header>

            <main className="app-main">
                <div className="app-container">
                    {step === 1 && (
                        <Welcome
                            goToLogin={goToLogin}
                            goToSignup={goToSignup}
                            setStep={setStep}
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
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 6 && (
                        <SecurityQuestion
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 7 && (
                        <ContactInfo
                            formData={formData}
                            setFormData={setFormData}
                            setPatientData={setPatientData}
                            nextStep={() => setStep(8)}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 8 && (
                        <Confirmation
                            formData={formData}
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={accessType} // Normal access
                        />
                    )}

                    {/* EmergencyAccess special step */}
                    {step === 9 && (
                        <Confirmation
                            formData={formData}
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={'emergency'} // Marked as emergency view
                        />
                    )}

                    {/* Emergency Access screen (not part of numbered steps) */}
                    {step === 10 && (
                        <EmergencyAccess
                            setPatientData={setPatientData}
                            setAccessType={setAccessType}
                            setStep={setStep}
                        />
                    )}

                    {(step < 1 || step > 10) && (
                        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
                            <h2>Oops! Something went wrong.</h2>
                            <button onClick={goBackToWelcome}>Return to Home</button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="app-footer">
                <p>© 2025 PatientPort. All rights reserved.</p>
            </footer>
        </>
    );
}

export default App;
