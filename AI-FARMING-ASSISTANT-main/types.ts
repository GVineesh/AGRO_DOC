
export interface CropRecommendation {
  cropName: string;
  reasoning: string;
  optimalConditions: string;
  plantingTips: string;
}

export interface DiseaseAnalysis {
  diseaseName: string;
  confidence: string;
  symptoms: string[];
  treatment: string;
  prevention: string;
}

export interface IrrigationAdvice {
  schedule: string;
  amount: string;
  reasoning: string;
}

export interface WeatherAdvice {
  summary: string;
  warnings: string[];
  suggestedTasks: string[];
}

export type AppView = 'home' | 'crop-rec' | 'disease' | 'irrigation' | 'chat' | 'about';
