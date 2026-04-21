import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import your local database and logic files
import { connectDB } from "./db.js";
import Chat from "./models/Chat.js";
import { searchVector, initVectorStore } from "./vectorStore.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// ==============================
// 🤖 GEMINI AI HELPER
// ==============================
const callGemini = async (userMessage, history = [], contextInfo = null) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { temperature: 0.6 } 
    });
    
    let prompt = `You are the highly intelligent, mindful, and articulate AI manifestation of Harshad Patil.
You have absolute knowledge of Harshad's life, skills, and projects. You speak confidently on his behalf in the first person ("I am Harshad's AI", "Harshad built...").

Here is everything you know about Harshad:
- **Identity**: Harshad Patil is a passionate Full Stack Developer and AI Engineer. He is an engineering student at the Universal College of Engineering.
- **Skills (The Arsenal)**: Expert in React, Node.js, Python, MongoDB, Langchain, Docker, AWS, Figma, and C++.
- **Experience**: Worked as an Embedded Engineer Intern at Race Tech Pvt Ltd, where he developed power-control systems, performed hardware testing, and did microcontroller troubleshooting.
- **Project 1: PDF Chat WebApp**: A highly advanced RAG-based AI application using LLaMA-2 to chat with documents.
- **Project 2: Healthcare AI**: A machine learning system designed for predictive disease modeling.
- **Project 3: Fake Website Detector**: An incredibly accurate tool (92% accuracy) built to detect phishing and malicious websites.
- **Contact**: Email is harshadpatil841@gmail.com.

Rules for your responses:
1. Be incredibly clever, mindful, and highly articulate.
2. Structure your answers beautifully using Markdown. Use **bolding** for emphasis, bullet points for lists, and short paragraphs.
3. If the user asks about Harshad, respond with deep, confident knowledge based on the facts above. Be conversational, never robotic.
4. If the RAG context provides extra info, integrate it seamlessly.
`;

    if (contextInfo) {
      prompt += `\nAdditional specific context retrieved from Harshad's database:\n"${contextInfo}"\nIncorporate this naturally if it answers the user's question.\n`;
    }

    prompt += `
Conversation history:
${history.join("\n")}

Current User Question: ${userMessage}
AI:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let output = response.text().trim();
    return output || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

// ==============================
// ==============================
// 💬 OPTIMIZED CHAT ENDPOINT
// ==============================
app.post("/chat", async (req, res) => {
  try {
    const userMessage = (req.body.message || "").toLowerCase();
    const sessionId = req.body.sessionId || "default";

    // 1. LOAD MEMORY FROM MONGODB
    const pastChats = await Chat.find({ sessionId }).sort({ createdAt: -1 }).limit(6);
    const history = pastChats.reverse().map(chat => 
      `${chat.role === "user" ? "User" : "AI"}: ${chat.message}`
    );

    // 2. CHECK VECTOR RAG (Search through your resume.txt)
    const relevantData = await searchVector(userMessage);

    // 3. GENERATE SMART REPLY WITH GEMINI
    const aiReply = await callGemini(userMessage, history, relevantData);
    
    // Helpful fallback if the AI model is offline or loading
    const finalReply = aiReply || "I'm still learning about Harshad's world! You can see his full 'Arsenal' and projects like the PDF Chat App right here on this page.";
    
    await Chat.create({ sessionId, role: "user", message: userMessage });
    await Chat.create({ sessionId, role: "ai", message: finalReply });

    return res.json({ reply: finalReply });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ reply: "⚠️ Connection is a bit shaky, try again!" });
  }
});

// ==============================
// 🚀 SERVER STARTUP SEQUENCE
// ==============================
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB();
    // Initialize the Vector Store (loads resume.txt and creates embeddings)
    await initVectorStore();
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  } catch (error) {
    console.error("Critical Startup Error:", error);
    process.exit(1);
  }
};

startServer();