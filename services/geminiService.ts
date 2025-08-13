import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// AIクライアントを一度だけ初期化します。環境変数からAPI_KEYを使用します。
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateExcelFormula(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.2,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Gemini APIの呼び出し中にエラーが発生しました:", error);
        // 呼び出し元で処理できるようにエラーを再スローします
        throw error;
    }
}
