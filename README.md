# CollegeSetu — Setup & Run Guide

A friendly learning website for Indian students after Class 12, with a built-in AI assistant powered by **Qwen 3.5 4B** running locally on your device. No internet or API key needed for the AI.

---

## Project Location

```
D:\collegesetu\CollegeSetu_Corrected\
```

---

## Required Software

| Software | Purpose | Download |
|---|---|---|
| **Node.js** (v18 or newer) | Runs the backend server | https://nodejs.org |
| **Ollama** | Runs the Qwen AI model locally | https://ollama.com |

---

## First-Time Setup

Open **Command Prompt** (not PowerShell) and run these commands **once**:

### 1. Install Node.js packages

```cmd
cd /d D:\collegesetu\CollegeSetu_Corrected
npm install
```

You should see: `added 65 packages` — that means it worked.

### 2. Download the Qwen AI model

```cmd
ollama pull qwen3.5:4b
```

This downloads a ~3.3 GB file. Only needed once. Your computer needs internet for this step.

---

## Checking Whether the Model Is Installed

```cmd
ollama list
```

You should see `qwen3.5:4b` in the list. If it is missing, run `ollama pull qwen3.5:4b`.

---

## Starting CollegeSetu

Every time you want to use the website, follow these steps:

### Step 1 — Start Ollama

Open the **Ollama** application from your Start menu or taskbar. Wait for its icon to appear in the system tray (bottom-right corner of your screen).

Or run in Command Prompt:
```cmd
ollama serve
```

### Step 2 — Start the CollegeSetu server

Open **Command Prompt** and run:

```cmd
cd /d D:\collegesetu\CollegeSetu_Corrected
node server.js
```

You will see:
```
─────────────────────────────────────────
  CollegeSetu  →  http://127.0.0.1:5500
  AI model     →  qwen3.5:4b
  Ollama URL   →  http://127.0.0.1:11434/api/chat
─────────────────────────────────────────
```

Keep this Command Prompt window open while using the website.

### Step 3 — Open the website

Open your browser and go to:

**http://127.0.0.1:5500**

---

## What's on the Website

| Page | Description |
|---|---|
| **Home** | Introduction and quick links |
| **Learn** | 4 beginner lessons with quizzes (progress saved) |
| **Typing** | 1-minute typing challenge with WPM and accuracy stats |
| **Coding** | Code examples in Python, C, C++, Java, JavaScript |
| **✨ Ask AI** | Chat with Qwen 3.5 4B — college tips, coding help, and more |

---

## Troubleshooting

### "Cannot reach local server" in the AI chat

The Node.js server is not running. Open Command Prompt and run:
```cmd
cd /d D:\collegesetu\CollegeSetu_Corrected
node server.js
```

### "Ollama is not responding"

Ollama is not started. Open the Ollama app from your Start menu.

### "Model not found"

The Qwen model is not downloaded. Run:
```cmd
ollama pull qwen3.5:4b
```

### "npm is not recognized" or "node is not recognized"

Node.js is not installed. Download it from https://nodejs.org and install it, then reopen Command Prompt.

### Port 5500 is already in use

Something else is using port 5500 (e.g. VS Code Live Server). Either close that program, or edit the `server.js` file and change `const PORT = 5500` to another number like `8765`, then restart the server.

### PowerShell says "npm.ps1 cannot be loaded"

Use **Command Prompt** (cmd) instead of PowerShell, as shown in the instructions above.

---

## API Endpoints (for developers)

| Endpoint | Method | Description |
|---|---|---|
| `GET /api/health` | GET | Check if Ollama and the model are running |
| `POST /api/chat` | POST | Send a message and receive an AI reply |

**Chat request body:**
```json
{ "message": "Your question here", "history": [] }
```

**Chat response:**
```json
{ "answer": "AI's reply here" }
```

---

## Notes

- All progress (lessons, typing best score) is saved in your browser's local storage.
- The AI runs entirely on your device — no data leaves your computer.
- The AI may make mistakes. Always verify important facts from official sources.
- Tested with: Ollama 0.40.11 · qwen3.5:4b · Node.js 18+ · Windows 11
