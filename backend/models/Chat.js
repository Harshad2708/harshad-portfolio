import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: String,
  role: String, // "user" or "ai"
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);