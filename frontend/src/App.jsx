import { useState } from 'react';
import PatientForm from './components/PatientForm';
import MedicalInfo from './components/MedicalInfo';
import LifestyleInfo from './components/LifestyleInfo';
import SecurityQuestion from './components/SecurityQuestion';
import SecurityCheckLogin from './components/SecurityCheckLogin';
import ContactInfo from './components/ContactInfo';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import Welcome from './components/Welcome';
import EmergencyAccess from './components/EmergencyAccess';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorLogin from './components/DoctorLogin';
import SignupRoleChoice from './components/SignupRoleChoice';
import DoctorForm1 from './components/DoctorForm1';
import DoctorForm2 from './components/DoctorForm2';
import DoctorConfirmation from './components/DoctorConfirmation';
import DoctorLicenseForm from './components/DoctorLicenseForm';
import DoctorLicensePrompt from './components/DoctorLicensePrompt';
import ReadOnlyConfirmation from './components/ReadOnlyConfirmation';
import MyDoctors from './components/MyDoctors.jsx';
import DoctorReadOnlyConfirmation from './components/DoctorReadOnlyConfirmation.jsx';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    const [accessType, setAccessType] = useState('patient');
    const [patientData, setPatientData] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [tempDoctorId, setTempDoctorId] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        weight: '',
        heightFeet: '',
        heightInches: '',
        height: '',
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
        specialization: '',
        clinicName: '',
        clinicAddress: '',
        medicalLicense: '',
        _id: ''
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const goToLogin = () => setStep(2);
    const goToSignup = () => setStep(11);
    const goToDoctorLogin = () => setStep(99);
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
                        <Welcome
                            goToLogin={goToLogin}
                            goToSignup={goToSignup}
                            goToDoctorLogin={goToDoctorLogin}
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

                    {step === 11 && <SignupRoleChoice setStep={setStep} />}

                    {step === 3 && <PatientForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={goBackToWelcome} />}
                    {step === 4 && <MedicalInfo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                    {step === 5 && <LifestyleInfo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                    {step === 6 && <SecurityQuestion formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                    {step === 7 && <ContactInfo formData={formData} setFormData={setFormData} setPatientData={setPatientData} nextStep={() => setStep(8)} prevStep={prevStep} />}
                    {step === 8 && (
                        <Confirmation
                            formData={formData}
                            patientData={patientData}
                            setPatientData={setPatientData}
                            accessType={accessType}
                            setStep={setStep}
                        />
                    )}
                    {step === 14 && (
                        <MyDoctors
                            patientId={patientData?._id}
                            setStep={setStep}
                            setSelectedDoctor={setSelectedDoctor}
                        />
                    )}
                    {step === 20 && <DoctorForm1 formData={formData} setFormData={setFormData} setStep={setStep} />}
                    {step === 21 && <DoctorForm2 formData={formData} setFormData={setFormData} setStep={setStep} />}
                    {step === 24 && <DoctorLicenseForm formData={formData} setFormData={setFormData} setStep={setStep} setDoctorId={setDoctorId} />}
                    {step === 23 && <DoctorConfirmation formData={formData} />}
                    {step === 9 && <SecurityCheckLogin formData={formData} setFormData={setFormData} nextStep={() => setStep(8)} />}
                    {step === 10 && <EmergencyAccess setPatientData={setPatientData} setAccessType={setAccessType} setStep={setStep} />}
                    {step === 99 && <DoctorLogin setStep={setStep} setTempDoctorId={setTempDoctorId} />}
                    {step === 26 && <DoctorLicensePrompt tempDoctorId={tempDoctorId} setDoctorId={setDoctorId} setStep={setStep} />}
                    {step === 12 && <DoctorDashboard doctorId={doctorId} setStep={setStep} setSelectedPatient={setSelectedPatient} />}
                    {step === 13 && <ReadOnlyConfirmation patient={selectedPatient} goBack={() => setStep(12)} />}
                    {step === 27 && <DoctorReadOnlyConfirmation selectedDoctor={selectedDoctor} setStep={setStep} />}

                    {(step < 1 || (step > 27 && ![12, 13, 14, 20, 21, 23, 24, 26, 99].includes(step))) && (
                        <div>
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
