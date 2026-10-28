/**
 * CollegeSetu — Express backend
 * Serves the static website and proxies chat requests to Ollama (qwen3.5:4b).
 */

"use strict";

const express = require("express");
const path = require("path");

const app = express();
const PORT = 5500;
const OLLAMA_CHAT_URL = "http://127.0.0.1:11434/api/chat";
const OLLAMA_TAGS_URL = "http://127.0.0.1:11434/api/tags";
const MODEL = "qwen3.5:4b";

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));

// Serve index.html, styles.css, app.js from the same directory as server.js
app.use(express.static(path.join(__dirname)));

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", async (_req, res) => {
  try {
    const response = await fetch(OLLAMA_TAGS_URL, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error("Ollama tags endpoint returned " + response.status);

    const data = await response.json();
    const available = Array.isArray(data.models) &&
      data.models.some((m) => m.name === MODEL || m.name.startsWith(MODEL.split(":")[0]));

    res.json({
      ok: Boolean(available),
      model: MODEL,
      message: available
        ? "Qwen 3.5 4B is ready."
        : `Model not found. Run: ollama pull ${MODEL}`
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      model: MODEL,
      message: "Ollama is not responding. Please start Ollama and try again."
    });
  }
});

// ── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Please enter a question." });
  }

  // Sanitise and cap history
  const safeHistory = Array.isArray(history)
    ? history
        .filter((item) =>
          item &&
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string"
        )
        .slice(-10)
        .map((item) => ({ role: item.role, content: item.content.slice(0, 4000) }))
    : [];

  const systemPrompt =
    "You are CollegeSetu AI, a friendly assistant for Indian students who have " +
    "just finished Class 12 and are preparing for college. " +
    "Help with: college admissions, choosing streams, learning computers, " +
    "coding basics (Python, C, C++, Java, JavaScript), study tips, and general " +
    "questions about college life. " +
    "Use simple English and clear step-by-step explanations. " +
    "Be encouraging and supportive. " +
    "Do NOT invent specific admission dates, fees, or cutoff marks — " +
    "always tell the student to verify official sources. " +
    "Keep answers concise unless more detail is requested.";

  try {
    const ollamaRes = await fetch(OLLAMA_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          { role: "system", content: systemPrompt },
          ...safeHistory,
          { role: "user", content: message.trim().slice(0, 4000) }
        ],
        options: { temperature: 0.7, num_predict: 1024 }
      })
    });

    if (!ollamaRes.ok) throw new Error("Ollama returned HTTP " + ollamaRes.status);

    const data = await ollamaRes.json();
    const answer = data.message?.content;
    if (!answer) throw new Error("The model returned an empty response.");

    res.json({ answer });
  } catch (err) {
    console.error("[CollegeSetu] Chat error:", err.message);
    res.status(502).json({
      error:
        "Could not get a response from Qwen. " +
        "Make sure Ollama is running and qwen3.5:4b is installed."
    });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, "127.0.0.1", () => {
  console.log("─────────────────────────────────────────");
  console.log(`  CollegeSetu  →  http://127.0.0.1:${PORT}`);
  console.log(`  AI model     →  ${MODEL}`);
  console.log(`  Ollama URL   →  ${OLLAMA_CHAT_URL}`);
  console.log("─────────────────────────────────────────");
});
