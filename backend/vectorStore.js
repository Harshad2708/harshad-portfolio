import { pipeline } from "@xenova/transformers";
import fs from "fs";

let embedder;
let vectors = [];
let texts = [];

// Load model once
export const initVectorStore = async () => {
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const data = fs.readFileSync("./data/resume.txt", "utf-8");

  texts = data.split("\n").filter(line => line.trim() !== "");

  for (let text of texts) {
    const embedding = await embedder(text, { pooling: "mean", normalize: true });
    vectors.push(embedding.data);
  }

  console.log("✅ Vector DB ready");
};

// Cosine similarity
const similarity = (a, b) => {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Search function
export const searchVector = async (query) => {
  const queryEmbedding = await embedder(query, {
    pooling: "mean",
    normalize: true,
  });

  let bestScore = -1;
  let bestText = "";

  for (let i = 0; i < vectors.length; i++) {
    const score = similarity(queryEmbedding.data, vectors[i]);

    if (score > bestScore) {
      bestScore = score;
      bestText = texts[i];
    }
  }

  if (bestScore > 0.5) {
  return bestText;
} else {
  return null;
}
};