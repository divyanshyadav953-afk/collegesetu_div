/**
 * CollegeSetu — app.js
 * Handles: page navigation, lessons, typing practice, coding examples, AI chat.
 */

"use strict";

// ═══════════════════════════════════════════════════════════════
//  PAGE NAVIGATION
// ═══════════════════════════════════════════════════════════════

function showPage(name) {
  document.querySelectorAll(".page").forEach((el) => el.classList.remove("active-page"));
  document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));

  const target = document.getElementById(name);
  if (target) target.classList.add("active-page");

  const navBtn = document.querySelector(`.nav-link[data-page="${name}"]`);
  if (navBtn) navBtn.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Nav buttons
document.querySelectorAll(".nav-link[data-page]").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

// Brand link
document.querySelectorAll("[data-page]").forEach((el) => {
  if (el.tagName === "A") {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(el.dataset.page);
    });
  }
});

// "data-go" shortcut buttons (home page cards, hero button)
document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.go));
});

// ═══════════════════════════════════════════════════════════════
//  LESSONS
// ═══════════════════════════════════════════════════════════════

const LESSONS = {
  computer: {
    title: "Meet your computer",
    content: `
      <span class="lesson-number">LESSON 1</span>
      <h2>What does a computer do?</h2>
      <p>A computer is a machine that follows instructions very quickly. You give it instructions and it does the work.</p>
      <p>Every computer has four main jobs:</p>
      <ul>
        <li><strong>Input</strong> — receives information (keyboard, mouse, microphone)</li>
        <li><strong>Processing</strong> — thinks and works on the information (CPU)</li>
        <li><strong>Storage</strong> — remembers information (hard drive, RAM)</li>
        <li><strong>Output</strong> — shows the result (screen, speaker, printer)</li>
      </ul>
      <div class="example-box"><p>💡 <strong>Think of it like this:</strong> You type a word (input) → the computer reads it (processing) → saves it (storage) → shows it on screen (output).</p></div>
      <div class="question-box">
        <p><strong>Quick check:</strong> Which part of the computer shows you the result?</p>
        <div class="answer-options">
          <button class="answer-option" data-correct="false">Input</button>
          <button class="answer-option" data-correct="false">Processing</button>
          <button class="answer-option" data-correct="true">Output</button>
          <button class="answer-option" data-correct="false">Storage</button>
        </div>
        <p class="feedback" id="q-feedback"></p>
      </div>
      <div class="lesson-actions">
        <button class="primary-button" id="mark-done" data-lesson="computer">Mark as done ✓</button>
        <button class="secondary-button" data-go-lesson="files">Next lesson →</button>
      </div>`
  },
  files: {
    title: "Files and folders",
    content: `
      <span class="lesson-number">LESSON 2</span>
      <h2>Files and folders</h2>
      <p>A <strong>file</strong> is like a piece of paper where information is saved. A <strong>folder</strong> is like a drawer that holds many files together.</p>
      <p>Common file types you will see:</p>
      <ul>
        <li>📄 <strong>.docx / .pdf</strong> — documents (like notes or forms)</li>
        <li>🖼️ <strong>.jpg / .png</strong> — images and photos</li>
        <li>🎵 <strong>.mp3</strong> — music files</li>
        <li>🎬 <strong>.mp4</strong> — video files</li>
        <li>📊 <strong>.xlsx</strong> — spreadsheets (like tables)</li>
      </ul>
      <div class="example-box"><p>💡 <strong>Good habit:</strong> Give your files clear names like <code>Chemistry_Notes_Chapter3.pdf</code> instead of just <code>doc1.pdf</code>. Future you will be grateful!</p></div>
      <div class="question-box">
        <p><strong>Quick check:</strong> What is a folder?</p>
        <div class="answer-options">
          <button class="answer-option" data-correct="false">A single piece of saved information</button>
          <button class="answer-option" data-correct="true">A container that holds many files</button>
          <button class="answer-option" data-correct="false">A type of image file</button>
        </div>
        <p class="feedback" id="q-feedback"></p>
      </div>
      <div class="lesson-actions">
        <button class="primary-button" id="mark-done" data-lesson="files">Mark as done ✓</button>
        <button class="secondary-button" data-go-lesson="internet">Next lesson →</button>
      </div>`
  },
  internet: {
    title: "Explore the internet",
    content: `
      <span class="lesson-number">LESSON 3</span>
      <h2>Explore the internet</h2>
      <p>The internet is a huge network of computers all connected together. A <strong>browser</strong> (like Chrome, Edge, or Firefox) is the app you use to visit websites.</p>
      <p>Important words to know:</p>
      <ul>
        <li><strong>URL</strong> — the address of a website (example: <code>www.google.com</code>)</li>
        <li><strong>Search engine</strong> — a tool that helps you find websites (Google, Bing)</li>
        <li><strong>Download</strong> — copying a file from the internet to your computer</li>
        <li><strong>Upload</strong> — copying a file from your computer to the internet</li>
        <li><strong>Password</strong> — a secret key that protects your account</li>
      </ul>
      <div class="example-box"><p>🔒 <strong>Stay safe:</strong> Never share your password with anyone. Use a strong password that mixes letters, numbers, and symbols.</p></div>
      <div class="question-box">
        <p><strong>Quick check:</strong> What is a browser?</p>
        <div class="answer-options">
          <button class="answer-option" data-correct="false">A type of internet connection</button>
          <button class="answer-option" data-correct="true">An app used to visit websites</button>
          <button class="answer-option" data-correct="false">A website address</button>
        </div>
        <p class="feedback" id="q-feedback"></p>
      </div>
      <div class="lesson-actions">
        <button class="primary-button" id="mark-done" data-lesson="internet">Mark as done ✓</button>
        <button class="secondary-button" data-go-lesson="words">Next lesson →</button>
      </div>`
  },
  words: {
    title: "Learn tech words",
    content: `
      <span class="lesson-number">LESSON 4</span>
      <h2>Learn tech words</h2>
      <p>Technology has many short words and abbreviations. Here are the most common ones you will hear in college:</p>
      <ul>
        <li><strong>CPU</strong> — Central Processing Unit (the "brain" of the computer)</li>
        <li><strong>RAM</strong> — Random Access Memory (temporary memory for running programs)</li>
        <li><strong>GB / TB</strong> — Gigabyte / Terabyte (units for measuring storage size)</li>
        <li><strong>OS</strong> — Operating System (Windows, macOS, Linux)</li>
        <li><strong>Wi-Fi</strong> — Wireless internet connection</li>
        <li><strong>App / Software</strong> — A program you install and use</li>
        <li><strong>Bug</strong> — An error or mistake in a program</li>
        <li><strong>Backup</strong> — A copy of your files saved in another place</li>
      </ul>
      <div class="example-box"><p>🎓 <strong>Pro tip:</strong> When you hear a new tech word, just search "<em>word</em> explained simply" on Google. Learning one word a day adds up quickly!</p></div>
      <div class="question-box">
        <p><strong>Quick check:</strong> What does RAM stand for?</p>
        <div class="answer-options">
          <button class="answer-option" data-correct="false">Random App Memory</button>
          <button class="answer-option" data-correct="true">Random Access Memory</button>
          <button class="answer-option" data-correct="false">Read-only Accessible Memory</button>
        </div>
        <p class="feedback" id="q-feedback"></p>
      </div>
      <div class="lesson-actions">
        <button class="primary-button" id="mark-done" data-lesson="words">Mark as done ✓</button>
        <span class="completed-label" id="all-done-msg" style="display:none">🎉 All lessons complete!</span>
      </div>`
  }
};

const lessonProgress = JSON.parse(localStorage.getItem("cs_lessons") || "{}");

function updateProgressDisplay() {
  const count = Object.values(lessonProgress).filter(Boolean).length;
  const el = document.getElementById("lesson-progress");
  if (el) el.textContent = `${count} of 4 lessons completed`;

  document.querySelectorAll(".lesson-status").forEach((badge) => {
    const key = badge.dataset.status;
    if (lessonProgress[key]) {
      badge.textContent = "✓";
      badge.classList.add("completed");
    } else {
      badge.textContent = "○";
      badge.classList.remove("completed");
    }
  });
}

function loadLesson(name) {
  const lesson = LESSONS[name];
  if (!lesson) return;

  const body = document.getElementById("lesson-body");
  if (!body) return;
  body.innerHTML = lesson.content;

  // Highlight active menu item
  document.querySelectorAll(".lesson-choice").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lesson === name);
  });

  // Quiz buttons
  body.querySelectorAll(".answer-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      body.querySelectorAll(".answer-option").forEach((b) => (b.disabled = true));
      const fb = body.querySelector("#q-feedback");
      if (btn.dataset.correct === "true") {
        fb.textContent = "✅ Correct! Well done.";
        fb.className = "feedback success";
      } else {
        fb.textContent = "❌ Not quite — try remembering the explanation above.";
        fb.className = "feedback try-again";
      }
    });
  });

  // Mark done button
  const markBtn = body.querySelector("#mark-done");
  if (markBtn) {
    if (lessonProgress[name]) markBtn.textContent = "Done ✓";
    markBtn.addEventListener("click", () => {
      lessonProgress[name] = true;
      localStorage.setItem("cs_lessons", JSON.stringify(lessonProgress));
      markBtn.textContent = "Done ✓";
      updateProgressDisplay();
    });
  }

  // Next lesson links inside lesson body
  body.querySelectorAll("[data-go-lesson]").forEach((btn) => {
    btn.addEventListener("click", () => loadLesson(btn.dataset.goLesson));
  });

  // "All done" label for last lesson
  const allDone = body.querySelector("#all-done-msg");
  if (allDone && Object.keys(lessonProgress).length === 4) {
    allDone.style.display = "inline";
  }
}

// Lesson menu clicks
document.querySelectorAll(".lesson-choice").forEach((btn) => {
  btn.addEventListener("click", () => loadLesson(btn.dataset.lesson));
});

// Load first lesson on start
loadLesson("computer");
updateProgressDisplay();

// Update home progress
const homeProgress = document.getElementById("home-progress");
if (homeProgress) {
  const count = Object.values(lessonProgress).filter(Boolean).length;
  if (count > 0) homeProgress.textContent = `${count} of 4 lessons completed — keep going! 🌱`;
}

// ═══════════════════════════════════════════════════════════════
//  TYPING PRACTICE
// ═══════════════════════════════════════════════════════════════

const TYPING_TEXT =
  "Learning one small thing every day can make a big difference. I will practise patiently, ask questions, and keep improving my computer skills.";

let typingTimer = null;
let typingStartTime = null;
let typingActive = false;
let typingFinished = false;

function resetTyping() {
  clearInterval(typingTimer);
  typingTimer = null;
  typingStartTime = null;
  typingActive = false;
  typingFinished = false;

  const input = document.getElementById("typing-input");
  const prompt = document.getElementById("typing-prompt");
  const message = document.getElementById("typing-message");

  if (input) { input.value = ""; input.disabled = false; }
  if (prompt) prompt.textContent = TYPING_TEXT;
  if (message) {
    message.textContent = "Ready when you are. Your timer begins with your first keystroke.";
    message.className = "feedback";
  }

  setTypingStat("stat-time", "60s");
  setTypingStat("stat-wpm", "0 WPM");
  setTypingStat("stat-accuracy", "100%");
  setTypingStat("stat-correct", "0");

  const timerPill = document.getElementById("timer");
  if (timerPill) timerPill.textContent = "60 sec";
}

function setTypingStat(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function finishTyping(input) {
  if (typingFinished) return;
  typingFinished = true;
  typingActive = false;
  clearInterval(typingTimer);
  if (input) input.disabled = true;

  const typed = (input ? input.value : "").trim();
  const target = TYPING_TEXT;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
  }
  const totalChars = typed.length || 1;
  const accuracy = Math.round((correct / Math.max(typed.length, 1)) * 100);
  const elapsed = typingStartTime ? (Date.now() - typingStartTime) / 60000 : 1;
  const words = typed.split(/\s+/).filter(Boolean).length;
  const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;

  setTypingStat("stat-wpm", wpm + " WPM");
  setTypingStat("stat-accuracy", accuracy + "%");
  setTypingStat("stat-correct", correct.toString());

  const message = document.getElementById("typing-message");
  if (message) {
    message.textContent = `Done! ${wpm} WPM at ${accuracy}% accuracy.`;
    message.className = accuracy >= 85 ? "feedback success" : "feedback try-again";
  }

  // Save best
  const best = JSON.parse(localStorage.getItem("cs_typing_best") || "{}");
  if (!best.wpm || wpm > best.wpm) {
    best.wpm = wpm;
    best.accuracy = accuracy;
    localStorage.setItem("cs_typing_best", JSON.stringify(best));
  }
  const bestEl = document.getElementById("typing-best");
  if (bestEl && best.wpm) {
    bestEl.textContent = `Best: ${best.wpm} WPM at ${best.accuracy}% accuracy.`;
  }
}

const typingInput = document.getElementById("typing-input");
if (typingInput) {
  typingInput.addEventListener("input", () => {
    if (typingFinished) return;

    if (!typingActive) {
      typingActive = true;
      typingStartTime = Date.now();
      let timeLeft = 60;

      typingTimer = setInterval(() => {
        timeLeft--;
        setTypingStat("stat-time", timeLeft + "s");
        const timerPill = document.getElementById("timer");
        if (timerPill) timerPill.textContent = timeLeft + " sec";

        const elapsed = (Date.now() - typingStartTime) / 60000;
        const words = typingInput.value.split(/\s+/).filter(Boolean).length;
        const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
        setTypingStat("stat-wpm", wpm + " WPM");

        const typed = typingInput.value;
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
          if (typed[i] === TYPING_TEXT[i]) correct++;
        }
        const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
        setTypingStat("stat-accuracy", accuracy + "%");
        setTypingStat("stat-correct", correct.toString());

        if (timeLeft <= 0) finishTyping(typingInput);
      }, 1000);
    }
  });
}

const typingStartBtn = document.getElementById("typing-start");
if (typingStartBtn) typingStartBtn.addEventListener("click", resetTyping);

const typingFinishBtn = document.getElementById("typing-finish");
if (typingFinishBtn) typingFinishBtn.addEventListener("click", () => finishTyping(typingInput));

// Show best on load
(function loadTypingBest() {
  const best = JSON.parse(localStorage.getItem("cs_typing_best") || "{}");
  const bestEl = document.getElementById("typing-best");
  if (bestEl && best.wpm) bestEl.textContent = `Best: ${best.wpm} WPM at ${best.accuracy}% accuracy.`;
})();

// ═══════════════════════════════════════════════════════════════
//  CODING EXAMPLES
// ═══════════════════════════════════════════════════════════════

const CODE_EXAMPLES = {
  Python: {
    title: "Python says hello",
    code: `print("Hello, college!")`,
    explanation: "This tells Python to display the words Hello, college! on the screen. print() is a built-in command that shows output.",
    output: "Hello, college!"
  },
  C: {
    title: "C says hello",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, college!\\n");\n    return 0;\n}`,
    explanation: "C is a foundational language. #include brings in tools, main() is where the program starts, and printf() prints text.",
    output: "Hello, college!"
  },
  "C++": {
    title: "C++ says hello",
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, college!" << endl;\n    return 0;\n}`,
    explanation: "C++ extends C with extra features. cout (pronounced 'see-out') prints text, and << sends the text to the screen.",
    output: "Hello, college!"
  },
  Java: {
    title: "Java says hello",
    code: `public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Hello, college!");\n    }\n}`,
    explanation: "Java requires a class to contain every program. System.out.println() is how Java prints a line to the screen.",
    output: "Hello, college!"
  },
  JavaScript: {
    title: "JavaScript says hello",
    code: `console.log("Hello, college!");`,
    explanation: "JavaScript runs in web browsers. console.log() sends a message to the browser's developer console — try pressing F12 to see it!",
    output: "Hello, college!"
  }
};

document.querySelectorAll(".language-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".language-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");

    const lang = card.dataset.language;
    const ex = CODE_EXAMPLES[lang];
    if (!ex) return;

    const title = document.getElementById("code-title");
    const code = document.getElementById("code-example");
    const explanation = document.getElementById("code-explanation");
    const output = document.getElementById("code-output");

    if (title) title.textContent = ex.title;
    if (code) code.textContent = ex.code;
    if (explanation) explanation.textContent = ex.explanation;
    if (output) output.textContent = ex.output;
  });
});

// ═══════════════════════════════════════════════════════════════
//  AI CHAT
// ═══════════════════════════════════════════════════════════════

let chatHistory = [];

// ── Helpers ────────────────────────────────────────────────────

function safeText(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatAIText(raw) {
  // Convert simple markdown-like patterns to HTML safely
  // Work on a safe text base then apply lightweight formatting
  let text = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic *text*
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code `text`
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Numbered list lines
  text = text.replace(/^(\d+\.\s)/gm, "<br>$1");
  // Bullet list lines
  text = text.replace(/^[-•]\s/gm, "<br>• ");
  // Double newline → paragraph break
  text = text.replace(/\n\n+/g, "<br><br>");
  // Single newline
  text = text.replace(/\n/g, "<br>");

  return text;
}

function appendMessage(role, htmlContent, isLoading = false) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return null;

  const wrapper = document.createElement("div");
  wrapper.className = `chat-msg chat-msg--${role}`;
  if (isLoading) wrapper.classList.add("chat-msg--loading");

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";

  if (role === "user") {
    bubble.innerHTML = safeText(htmlContent);
  } else {
    bubble.innerHTML = htmlContent;
  }

  const meta = document.createElement("div");
  meta.className = "chat-meta";
  meta.textContent = role === "user" ? "You" : "CollegeSetu AI";

  wrapper.append(meta, bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
  return wrapper;
}

function setStatus(ok, message) {
  const dot = document.getElementById("status-dot");
  const label = document.getElementById("ai-status");
  if (dot) dot.className = "status-dot " + (ok === true ? "dot-ok" : ok === false ? "dot-error" : "dot-checking");
  if (label) label.textContent = message;
}

// ── Health check ───────────────────────────────────────────────

async function checkAIStatus() {
  setStatus(null, "Checking connection…");
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    setStatus(data.ok, data.ok ? "● Qwen 3.5 4B is ready" : "● " + data.message);
  } catch {
    setStatus(false, "● Cannot reach local server — is it running?");
  }
}

// ── Send message ───────────────────────────────────────────────

async function sendChatMessage(text) {
  const welcome = document.querySelector(".chat-welcome");
  if (welcome) welcome.remove();

  appendMessage("user", text);
  chatHistory.push({ role: "user", content: text });
  chatHistory = chatHistory.slice(-20);

  const loadingEl = appendMessage(
    "assistant",
    '<span class="typing-dots"><span></span><span></span><span></span></span>',
    true
  );

  const sendBtn = document.getElementById("sendButton");
  const input = document.getElementById("userInput");
  if (sendBtn) { sendBtn.disabled = true; sendBtn.setAttribute("aria-busy", "true"); }

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: chatHistory.slice(0, -1) })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed.");

    if (loadingEl) {
      loadingEl.classList.remove("chat-msg--loading");
      const bubble = loadingEl.querySelector(".chat-bubble");
      if (bubble) bubble.innerHTML = formatAIText(data.answer);
    }

    chatHistory.push({ role: "assistant", content: data.answer });
    chatHistory = chatHistory.slice(-20);
    setStatus(true, "● Connected to local Qwen");
  } catch (err) {
    if (loadingEl) {
      loadingEl.classList.remove("chat-msg--loading");
      const bubble = loadingEl.querySelector(".chat-bubble");
      if (bubble) {
        bubble.innerHTML =
          `<span class="chat-error">⚠️ ${safeText(err.message || "Could not get a response.")} Make sure Ollama is running.</span>`;
      }
    }
    setStatus(false, "● AI error — check Ollama");
  } finally {
    if (sendBtn) { sendBtn.disabled = false; sendBtn.removeAttribute("aria-busy"); }
    if (input) { input.value = ""; input.style.height = "auto"; input.focus(); }
    const messages = document.getElementById("chatMessages");
    if (messages) messages.scrollTop = messages.scrollHeight;
  }
}

// ── Form submit ────────────────────────────────────────────────

const chatForm = document.getElementById("chatForm");
if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("userInput");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    sendChatMessage(text);
  });
}

// Enter key to submit (Shift+Enter = new line)
const userInput = document.getElementById("userInput");
if (userInput) {
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm && chatForm.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });

  // Auto-resize textarea
  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = Math.min(userInput.scrollHeight, 180) + "px";
  });
}

// Starter chip buttons
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => sendChatMessage(chip.dataset.prompt));
});

// Run health check when AI page is opened
document.querySelectorAll(".nav-link[data-page='ai']").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(checkAIStatus, 100);
  });
});

// Initial check if already on AI page
if (document.querySelector(".page#ai.active-page")) {
  checkAIStatus();
}
