import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI =
      "mongodb+srv://harshadpatil841:harshad123@cluster0.p6n7z9y.mongodb.net/chatDB?retryWrites=true&w=majority";

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Atlas Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};