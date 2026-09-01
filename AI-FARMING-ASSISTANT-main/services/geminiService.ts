
import { CropRecommendation, DiseaseAnalysis, IrrigationAdvice } from "../types";

const API_BASE_URL = 'http://localhost:5000/api';

export const getCropRecommendation = async (data: {
  soilType: string;
  ph: string;
  temp: string;
  humidity: string;
  rainfall: string;
}): Promise<CropRecommendation[]> => {
  const response = await fetch(`${API_BASE_URL}/crop-recommendation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to get crop recommendations');
  return response.json();
};

export const analyzeCropDisease = async (base64Image: string): Promise<DiseaseAnalysis> => {
  const response = await fetch(`${API_BASE_URL}/analyze-disease`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Image }),
  });
  if (!response.ok) throw new Error('Failed to analyze crop disease');
  return response.json();
};

export const getIrrigationAdvice = async (data: {
  moisture: string;
  temp: string;
  cropType: string;
}): Promise<IrrigationAdvice> => {
  const response = await fetch(`${API_BASE_URL}/irrigation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to get irrigation advice');
  return response.json();
};

export const getChatResponse = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) throw new Error('Failed to get chat response');
  const result = await response.json();
  return result.text;
};

export const getWeatherAdvice = async (city: string) => {
  // Weather advice currently uses Google Search via Gemini, which is integrated in the backend's chat or could be a separate endpoint.
  // For now, redirecting to chat or keeping as is if not critical. 
  // Let's implement a simple version or keep it for future if needed.
  return "Weather advice feature is being migrated to backend. Please use the chat for specific farming advice.";
};
