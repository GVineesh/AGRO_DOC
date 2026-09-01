import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini (set GEMINI_API_KEY in .env or .env.local)
if (!process.env.GEMINI_API_KEY) {
    console.warn('WARNING: GEMINI_API_KEY is not set. AI features will fail.');
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'AIzaSyB_5AQbwD3F-PmNvrxqqCYEQ3pOVTuHksg'});

// API Endpoints
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        console.log('Chat request message:', message);

        const chat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: "You are AgroAssist, a friendly and expert farming assistant. Provide practical, farmer-friendly advice. Keep it simple and helpful."
            }
        });

        const response = await chat.sendMessage({ message });
        const text = response?.text ?? (typeof response === 'string' ? response : '');
        res.json({ text });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to get chat response', details: error.message });
    }
});

app.post('/api/crop-recommendation', async (req, res) => {
    try {
        const data = req.body;
        const prompt = `Act as a senior agronomist. Given these conditions: Soil Type: ${data.soilType}, pH: ${data.ph}, Temperature: ${data.temp}°C, Humidity: ${data.humidity}%, Rainfall: ${data.rainfall}mm. Recommend 3 suitable crops in a strict JSON array format with properties: cropName, reasoning, optimalConditions, plantingTips.`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        res.json(JSON.parse(response.text));
    } catch (error) {
        console.error('Crop Recommendation error:', error);
        res.status(500).json({ error: 'Failed to get recommendations', details: error.message });
    }
});

app.post('/api/analyze-disease', async (req, res) => {
    try {
        const { image } = req.body; // Base64 image
        const prompt = "Analyze this crop leaf image. Identify any disease, describe symptoms, provide treatment and prevention steps. Return in JSON format with properties: diseaseName, confidence, symptoms (array), treatment, prevention.";

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: [
                { inlineData: { data: image.split(',')[1], mimeType: 'image/jpeg' } },
                { text: prompt }
            ],
            config: {
                responseMimeType: "application/json",
            }
        });

        res.json(JSON.parse(response.text));
    } catch (error) {
        console.error('Disease Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze disease', details: error.message });
    }
});

app.post('/api/irrigation', async (req, res) => {
    try {
        const data = req.body;
        const prompt = `Based on Soil Moisture: ${data.moisture}%, Temperature: ${data.temp}°C, and Crop: ${data.cropType}, provide specific irrigation guidance in JSON format with properties: schedule, amount, reasoning.`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        res.json(JSON.parse(response.text));
    } catch (error) {
        console.error('Irrigation Advice error:', error);
        res.status(500).json({ error: 'Failed to get irrigation advice', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
