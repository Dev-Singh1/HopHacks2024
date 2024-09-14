
import React, { useState } from 'react';
import axios from 'axios';
import SymptomForm from './SymptomForm';

const DiseasePrediction = () => {
  const [predictions, setPredictions] = useState([]);

  const fetchPrediction = async (symptoms) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
        params: {
          symptoms: JSON.stringify(symptoms.map(s => s.id)),
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
      <ul>
        {predictions.map((disease, index) => (
          <li key={index}>
            {disease.Issue.Name} - Probability: {disease.Issue.Accuracy}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiseasePrediction;
