import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image using the Gemini 3 Pro Image Preview model.
 * Supports image size selection (1K, 2K, 4K).
 */
export const generateAgencyAsset = async (
  prompt: string,
  size: '1K' | '2K' | '4K' = '1K'
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9", // Cinematic aspect ratio for agency work
          imageSize: size,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data received from Gemini.");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

/**
 * Uses Gemini 3 Pro Preview with Thinking Mode to generate complex strategic campaigns.
 */
export const generateStrategicCampaign = async (brief: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a world-class creative strategist for a futurist marketing agency. 
      Analyze the following client brief and provide a high-level, avant-garde campaign strategy. 
      Include: 
      1. Core Insight 
      2. Creative Concept Name
      3. Key Visual Direction
      4. Activation Idea.
      
      Client Brief: ${brief}`,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, 
        },
      },
    });

    return response.text || "Strategy generation incomplete.";
  } catch (error) {
    console.error("Strategy generation failed:", error);
    throw error;
  }
};

/**
 * Generates structured content for a Project or Service based on a title/brief.
 */
export const generateContentDescription = async (type: 'project' | 'service', title: string): Promise<any> => {
  try {
    const prompt = type === 'project' 
      ? `Generate a JSON object for a portfolio case study titled "${title}". 
         Fields required: 
         - challenge (2 sentences, professional agency tone)
         - solution (2 sentences, emphasizing tech and design)
         - type (short string e.g., "Branding + AI")
         - stats (short string e.g., "+200% ROI")`
      : `Generate a short, punchy description (max 2 sentences) for a creative agency service titled "${title}". Tone: Futurism, High-energy.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Content generation failed:", error);
    return null;
  }
};
