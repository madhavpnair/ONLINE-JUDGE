import { GoogleGenerativeAI } from '@google/generative-ai'; //for AI features 
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); //your Google API key

// 1. Code Review
export const aiCodeReview = async (code) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze the following code. Provide a concise review and a list of improvements:\n\n${code}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// 2. First-level Hint
export const aiHintLevel1 = async (problem) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Give a basic, first-level hint to help solve this problem:\n\n${problem}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// 3. Second-level Hint
export const aiHintLevel2 = async (problem) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Give a deeper second-level hint that nudges the user toward the solution:\n\n${problem}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// 4. Error Explanation
export const aiErrorExplanation = async (errorMessage,code) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Explain the following error message in simple terms and suggest how to fix it:\n\n${errorMessage}:\n${code}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};