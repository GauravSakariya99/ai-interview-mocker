const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
    
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
    
const generationConfig = {
    temperature: 0.8,
    topP: 0.85,
    topK: 250,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
};

export const chatSession = model.startChat({
    generationConfig
});
