import { useState } from 'react';
import PatientInfo from './components/PatientForm.jsx';
import MedicalInfo from './components/medicalInfo.jsx';
import LifestyleInfo from './components/lifestyleInfo.jsx';
import './App.css';

function App() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
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

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="app-container">
            <h1>Patient Intake Form</h1>

            {step === 1 && (
                <PatientInfo
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <MedicalInfo
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <LifestyleInfo
                    formData={formData}
                    setFormData={setFormData}
                    prevStep={prevStep}
                />
            )}
        </div>
    );
}

export default App;
