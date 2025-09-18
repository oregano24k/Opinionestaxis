import { GoogleGenAI } from "@google/genai";
import { SearchResult, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchCompanyInfo = async (company: string, period?: string): Promise<SearchResult> => {
    try {
        let prompt = `Realiza una búsqueda exhaustiva sobre la compañía de transporte "${company}" en República Dominicana.`;

        switch (period) {
            case 'today':
                prompt += ' Limita los resultados estrictamente a información publicada HOY.';
                break;
            case 'week':
                prompt += ' Limita los resultados estrictamente a información publicada ESTA SEMANA.';
                break;
            case 'month':
                prompt += ' Limita los resultados estrictamente a información publicada ESTE MES EN CURSO.';
                break;
        }

        prompt += ` Enfócate en noticias, opiniones de usuarios, promociones y cualquier controversia o evento importante. Es crucial que TODAS las fuentes de información sean de la República Dominicana.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const sources: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        if (!text) {
            throw new Error("No se recibió una respuesta de texto de la API.");
        }

        return { text, sources };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Error al contactar la IA: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al buscar la información.");
    }
};