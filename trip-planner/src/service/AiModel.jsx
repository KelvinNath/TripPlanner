import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for location:Las Vegas for 3 Day's for Couple with a Cheap budget,Give me a hotels options list with HotelName,Hotel address ,Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details.Place Image Url,Geo coordinates, ticket Pricing, Rating,\nTime to travel each of the location for 3 days with each day plan with best time to visit in JSON format" },
            ],
        },
    ],
});