import { useState } from 'react';
import PatientForm from './components/PatientForm';
import MedicalInfo from './components/MedicalInfo';
import LifestyleInfo from './components/LifestyleInfo';
import SecurityQuestion from './components/SecurityQuestion';
import SecurityCheckLogin from './components/SecurityCheckLogin'; // 👈 new import
import ContactInfo from './components/ContactInfo';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import Welcome from './components/Welcome';
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
        correctSecurityAnswer: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
    });

    const [patientData, setPatientData] = useState(null);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const goToLogin = () => setStep(2);
    const goToSignup = () => setStep(4);
    const goBackToWelcome = () => setStep(1);

    return (
        <>
            <header className="app-header">
                <div className="header-left">
                    <img src="/PatientPortLogo.png" alt="PatientPort Logo" className="logo" />
                    <h1>PatientPort</h1>
                </div>
            </header>

            <main className="app-main">
                <div className="app-container">
                    {step === 1 && (
                        <Welcome goToLogin={goToLogin} goToSignup={goToSignup} setStep={setStep} />
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
                        <SecurityCheckLogin
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={() => setStep(9)} // 👈 go directly to confirmation
                        />
                    )}

                    {/* Sign-up Flow */}
                    {step === 4 && (
                        <PatientForm
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={goBackToWelcome}
                        />
                    )}

                    {step === 5 && (
                        <MedicalInfo
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 6 && (
                        <LifestyleInfo
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 7 && (
                        <SecurityQuestion
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 8 && (
                        <ContactInfo
                            formData={formData}
                            setFormData={setFormData}
                            setPatientData={setPatientData}
                            nextStep={() => setStep(9)}
                            prevStep={prevStep}
                        />
                    )}

                    {step === 9 && (
                        <Confirmation
                            formData={formData}
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={accessType}
                        />
                    )}

                    {step === 10 && (
                        <Confirmation
                            formData={formData}
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={'emergency'}
                        />
                    )}

                    {step === 11 && (
                        <EmergencyAccess
                            setPatientData={setPatientData}
                            setAccessType={setAccessType}
                            setStep={setStep}
                        />
                    )}

                    {(step < 1 || step > 11) && (
                        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
                            <h2>Oops! Something went wrong.</h2>
                            <button onClick={goBackToWelcome}>Return to Home</button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
