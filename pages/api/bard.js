// import { GoogleGenerativeAI } from  "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export default async function(req, res) {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});



//   const msg = req.body.message || "hi";
//   console.log("MSG: "+msg);
//   const result = await model.generateContent(msg);
//   const response = await result.response;
//   const text = response.text();
//   console.log("REPLY: "+text);
  
//   res.status(200).json({ result: text });
// }

// node --version # Should be >= 18
// npm install @google/generative-ai
// imports
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = process.env.GEMINI_API_KEY;
  
export default async function(req, res) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 5,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "Hi" }],
        },
        {
          role: "model",
          parts: [{ text: "How can I assist you Today?" }],
        },
      ],
    });
  const msg = `${req.body.message} answer this question in 100 words or minimum` || "Hi";
    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text(); 
    console.log(text);
      res.status(200).json({ result: text });
  }