
import React, { useState } from 'react';

const SymptomForm = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const symptomList = symptoms.split(',').map(symptom => symptom.trim());
    onSubmit(symptomList);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Symptoms (comma-separated):
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </label>
      <button type="submit">Get Prediction</button>
    </form>
  );
};

export default SymptomForm;
