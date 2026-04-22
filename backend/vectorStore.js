import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let resumeChunks = [];

// Load and chunk resume.txt on startup
export const initVectorStore = async () => {
  try {
    const filePath = path.join(__dirname, "data", "resume.txt");
    const data = fs.readFileSync(filePath, "utf-8");
    resumeChunks = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("="));
    console.log(`✅ Resume loaded — ${resumeChunks.length} lines indexed.`);
  } catch (err) {
    console.error("⚠️ Could not load resume.txt:", err.message);
    resumeChunks = [];
  }
};

// Simple keyword search — no native dependencies needed
export const searchVector = async (query) => {
  if (resumeChunks.length === 0) return null;

  const queryWords = query.toLowerCase().split(/\s+/);

  let bestScore = 0;
  let bestChunk = null;

  for (const chunk of resumeChunks) {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    for (const word of queryWords) {
      if (word.length > 2 && chunkLower.includes(word)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestChunk = chunk;
    }
  }

  return bestScore > 0 ? bestChunk : null;
};