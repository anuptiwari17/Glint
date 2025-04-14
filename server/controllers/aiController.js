const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(API_KEY);

exports.getSuggestion = async (req, res) => {
  try {
    const { url, method, headers, body, responseStatus, responseData } = req.body;

    const prompt = `As an API expert, analyze this failed API request and provide suggestions:
    
Request:
- URL: ${url}
- Method: ${method}
- Headers: ${JSON.stringify(headers || {})}
- Body: ${JSON.stringify(body || {})}

Response:
- Status: ${responseStatus}
- Data: ${JSON.stringify(responseData || {})}

Provide a clear and concise suggestion about what might be wrong and how to fix it.`;

    // Create a new model instance with the correct model name
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

    // Generate content with proper error handling
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No response from AI model");
    }

    console.log("AI Response:", text);
    res.json({ suggestion: text });
    
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    res.status(500).json({ 
      error: "Failed to get AI suggestion", 
      details: error.message 
    });
  }
};