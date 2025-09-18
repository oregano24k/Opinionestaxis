import { GoogleGenAI } from "@google/genai";
import { SearchResult, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchCompanyInfo = async (company: string, period?: string): Promise<SearchResult> => {
    try {
        let prompt = `Utilizando ÚNICA Y EXCLUSIVAMENTE fuentes de noticias y sitios web de la República Dominicana, realiza una búsqueda exhaustiva sobre la compañía de transporte "${company}".`;

        switch (period) {
            case 'today':
                prompt += ' La búsqueda debe limitarse estrictamente a información publicada HOY.';
                break;
            case 'week':
                prompt += ' La búsqueda debe limitarse estrictamente a información publicada DURANTE ESTA SEMANA.';
                break;
            case 'month':
                prompt += ' La búsqueda debe limitarse estrictamente a información publicada DURANTE ESTE MES EN CURSO.';
                break;
        }

        prompt += ` La búsqueda debe enfocarse en noticias, opiniones de usuarios, promociones y cualquier controversia o evento importante relacionado con "${company}" en el país.`;
        prompt += ` Organiza la respuesta de la siguiente manera: primero, un resumen general en párrafos. Luego, bajo un encabezado "## Datos Clave", lista los puntos más importantes, como fechas, cifras, estadísticas o promociones relevantes, usando viñetas (con '*' o '-').`;


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