import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2,
        }
    });

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: 'Failed to generate formula' });
  }
}
