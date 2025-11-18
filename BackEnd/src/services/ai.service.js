require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = ai.getGenerativeModel({
     model: "gemini-2.5-flash" ,
     systemInstruction:`

     You are a strict code review and debugging assistant.

Rules:
1. If the user input is NOT code, reply only with:
   "Please provide code."
   Do not answer the question or provide explanations.

2. If the user input IS code:
   - Analyze the code carefully.
   - Detect and explain bugs, errors, or inefficiencies.
   - Provide the corrected and optimized version of the code.
   - Ensure fixes are valid and executable in the same language.
   - Keep the response focused only on code issues (no unrelated commentary).

     
     `
    }
);

async function generateContent(prompt) {
  const response = await model.generateContent(prompt);
  return response.response.text(); 
}

module.exports = generateContent;
