
import React, { useState } from 'react';
import axios from 'axios';
import SymptomForm from './SymptomForm';
import PredictionChart from './PredictionChart';

const DiseasePrediction = () => {
  const [predictions, setPredictions] = useState([]);

  const fetchPrediction = async (symptoms) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
        params: {
          symptoms: JSON.stringify(symptoms),
          gender: 'male',  // Change based on the user's input
          year_of_birth: 1985,  // Change based on the user's input
        },
        headers: {
          'X-RapidAPI-Key': 'f7CHt54GaAc29XiYs',
          'X-RapidAPI-Host': 'priaid-symptom-checker-v1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      setPredictions(response.data);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handleSymptomSubmit = async (symptoms) => {
    await fetchPrediction(symptoms);
  };

  return (
    <div>
      <SymptomForm onSubmit={handleSymptomSubmit} />
      <PredictionChart predictionData={predictions.map((disease, index) => (
          {label: disease.Issue.Name, value: disease.Issue.Accuracy / 100.0}
      ))} />
    </div>
  );
};

export default DiseasePrediction;
