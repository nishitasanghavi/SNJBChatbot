# 🏗️ SNJB Chatbot - Architecture Breakdown

## Quick Answer

**What is it?** 
✅ **Full-stack application** (React frontend + Express.js backend)  
✅ **Uses Server-Sent Events (SSE)** for streaming responses  
✅ **NO database needed** (stateless per conversation)  
✅ **NO WebSockets** (SSE is simpler and sufficient)

---

## 📊 Complete Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   YOUR WEBSITE                              │
│  (HTML, WordPress, Wix, React App, etc.)                    │
└────────────────────┬────────────────────────────────────────┘
                     │ (Embed Script)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│        SNJB CHATBOT WIDGET (React Component)                │
│  - Floating widget (bottom-right corner)                    │
│  - Chat UI with messages                                    │
│  - Input field                                              │
│  - Real-time typing animation                               │
│  - Quick reply buttons                                      │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTP POST
                    │ JSON: { message, history }
                    ▼
┌─────────────────────────────────────────────────────────────┐
│      EXPRESS.JS BACKEND (Node.js)                           │
│  - API Route: POST /api/chat                                │
│  - Validates request with Zod schema                        │
│  - Processes message through Gemini AI                      │
│  - Streams response via SSE                                 │
└───────────────────┬─────────────────────────────────────────┘
                    │ API Call
                    ▼
┌─────────────────────────────────────────────────────────────┐
│     GOOGLE GEMINI API (External Service)                    │
│  - Model: gemini-2.0-flash                                  │
│  - System Prompt: College knowledge base                    │
│  - Generates contextual responses                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 How It Works (Step-by-Step)

### **1. User Opens Your Website**
```
Your Website → Loads HTML/React/WordPress page
             → Embed script initializes
             → Creates iframe pointing to chatbot backend
             → Chatbot widget appears in bottom-right
```

### **2. User Sends a Message**
```
User types: "Tell me about admissions"
         ↓
Client-side React captures input
         ↓
Sends HTTP POST to: /api/chat
  {
    "message": "Tell me about admissions",
    "history": [  // Previous messages in conversation
      { "role": "user", "content": "What courses do you offer?" },
      { "role": "assistant", "content": "We offer B.Tech in..." }
    ]
  }
```

### **3. Backend Processes Request**
```
Express.js receives POST
         ↓
Validates with Zod schema
         ↓
Extracts message & history
         ↓
Passes to Gemini chatbot function
```

### **4. Gemini AI Generates Response**
```
Gemini receives:
  - SYSTEM_PROMPT: College knowledge base
  - Conversation history: Previous messages
  - Current message: User's question
         ↓
Generates response chunk-by-chunk
         ↓
Streams back via SSE (Server-Sent Events)
```

### **5. Response Streams to Frontend**
```
Backend streams chunks:
  data: {"type":"text","content":"SNJB"}\n\n
  data: {"type":"text","content":" College"}\n\n
  data: {"type":"text","content":" offers"}\n\n
  ...
  data: {"type":"done","quickReplies":[...]}\n\n
         ↓
React listens via EventSource
         ↓
Renders text character-by-character (like ChatGPT)
         ↓
Shows quick reply buttons when done
```

### **6. User Sees Real-Time Chat**
```
Message appears letter by letter
Typing indicator (bouncing dots) while generating
Quick reply buttons appear at the end
User can click to continue conversation
```

---

## 📁 Project Structure

```
Web-Companion-Chat/
│
├── 📂 client/                        ← Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   └── chatbot-widget.tsx    ← Main chat UI
│   │   ├── pages/
│   │   │   ├── home.tsx              ← Landing page
│   │   │   └── not-found.tsx
│   │   └── index.css
│   └── index.html
│
├── 📂 server/                        ← Backend (Express.js)
│   ├── index.ts                      ← Server startup
│   ├── routes.ts                     ← API routes (/api/chat)
│   ├── chatbot.ts                    ← Gemini AI integration
│   ├── static.ts                     ← Serve static files
│   └── vite.ts                       ← Dev server setup
│
├── 📂 shared/                        ← Shared Types
│   └── schema.ts                     ← Request/response validation
│
├── package.json                      ← Dependencies
├── tsconfig.json                     ← TypeScript config
├── vite.config.ts                    ← Frontend build config
└── .env                              ← Environment variables (GEMINI_API_KEY)
```

---

## 🔌 API Endpoint Details

### **POST /api/chat**

**Request:**
```json
{
  "message": "Tell me about admissions",
  "history": [
    {
      "role": "user",
      "content": "What courses are offered?"
    },
    {
      "role": "assistant",
      "content": "We offer B.Tech in Computer Engineering..."
    }
  ]
}
```

**Response (Server-Sent Events - SSE):**
```
event: (none)
data: {"type":"text","content":"SNJB"}\n\n

event: (none)
data: {"type":"text","content":" College"}\n\n

...more chunks...

event: (none)
data: {"type":"done","quickReplies":["About SNJB","Courses Offered","Admissions"]}\n\n
```

**Why SSE instead of WebSockets?**
- ✅ Simpler to implement
- ✅ Built into HTTP (no extra connection)
- ✅ Perfect for one-way server → client streaming
- ✅ Works with all hosting platforms
- ✅ Better for chatbots (server pushes responses)

---

## 🗄️ Database: Why None Needed

### **No Database Because:**

✅ **Stateless Architecture**
- No user accounts
- No persistent storage needed
- Each conversation is per-session

✅ **Data Flow:**
```
User's Browser
    ↓
Conversation history stored IN BROWSER
    ↓
Sent to server only when needed
    ↓
Server processes & responds
    ↓
Conversation history updated in browser
```

✅ **What About Conversation Memory?**
- Stored in React state on frontend
- When page refreshes → resets (by design)
- If you want persistent history → would need database

### **If You Added a Database Later:**
```typescript
// Would look like:
app.post("/api/chat", async (req, res) => {
  const { message, history, userId } = req.body;
  
  // Save to database
  await db.messages.create({
    userId,
    content: message,
    role: "user",
    timestamp: new Date()
  });
  
  // Stream response...
  const response = await gemini.generateResponse(message, history);
  
  // Save bot response
  await db.messages.create({
    userId,
    content: response,
    role: "assistant",
    timestamp: new Date()
  });
});
```

But for now - **not needed** ✅

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | Chat UI component |
| | Vite | Fast build tool |
| | Tailwind CSS | Styling |
| | Framer Motion | Animations |
| | Lucide Icons | Icons |
| **Backend** | Express.js | REST API server |
| | TypeScript | Type safety |
| | Zod | Request validation |
| **AI** | Google Gemini API | LLM for responses |
| **Deployment** | Node.js | Runtime |
| | SSE (HTTP) | Response streaming |

---

## 🚀 Deployment Architecture

When you deploy to production:

```
┌────────────────────────────────────────────┐
│   Railway.app / Vercel / Render.com       │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Node.js Server (Production Build)   │ │
│  │                                      │ │
│  │  ├── React App (dist/client)         │ │
│  │  ├── Express API routes              │ │
│  │  └── Gemini Integration              │ │
│  │                                      │ │
│  │  Running on port 3000                │ │
│  └──────────────────────────────────────┘ │
│                                            │
└──────────────────┬─────────────────────────┘
                   │
         https://your-domain.app
```

---

## 💾 What Gets Sent to Gemini Each Time

```typescript
{
  systemInstruction: `You are SNJB Bot...
                      [Entire college knowledge base]
                      [Rules about what to answer]`,
  
  contents: [
    {
      role: "user",
      content: "What courses are offered?"
    },
    {
      role: "model",
      content: "We offer B.Tech in..."
    },
    {
      role: "user",
      content: "What about fees?"
    }
    // Current turn (being responded to)
  ]
}
```

**Note:** 
- System instruction sent every request (not cached by Gemini, but okay)
- Conversation history sent for context
- Entire history isn't huge per conversation (just text)

---

## 🔐 Security Architecture

```
Frontend (Browser)
  ↓
  └─→ Validates input
  
Backend (Express)
  ↓
  ├─→ Validates request with Zod schema
  ├─→ Rate limiting (optional, can add)
  └─→ Never exposes GEMINI_API_KEY to client
  
Gemini API (Secure)
  ↓
  └─→ API key stored server-side only
```

**API Key Security:**
- ✅ `GEMINI_API_KEY` stored in `.env` (never in code)
- ✅ `.env` in `.gitignore` (not on GitHub)
- ✅ Only server has access
- ✅ Requests to Gemini happen server-side only

---

## 📊 Data Flow Summary

```
User Input
   ↓
Browser (React)
   ↓
HTTP POST /api/chat (JSON)
   ↓
Express validates
   ↓
Pass to Gemini (with system prompt + history)
   ↓
Gemini streams response
   ↓
Express forwards via SSE
   ↓
Browser receives chunks
   ↓
React renders in real-time
   ↓
User sees ChatGPT-like response
```

---

## ❓ FAQ

**Q: Can I add user accounts?**
A: Yes! Would need database + authentication middleware

**Q: Can I save conversation history?**
A: Yes! Add database to store messages with userId

**Q: Why no WebSockets?**
A: SSE is simpler, one-way streaming, good for chat, easier to deploy

**Q: Is this scalable?**
A: Yes! Each request is stateless. Can handle 1000+ concurrent users

**Q: Can I change the AI model?**
A: Yes! Change `gemini-2.0-flash` to any Google Gemini model in `server/chatbot.ts`

**Q: How much will it cost?**
A: Depends on:
- Gemini API usage (free tier available)
- Hosting fees ($0-10/month for free tier platforms)

**Q: Can I make it private (only for SNJB website)?**
A: Yes! Add authentication/CORS restrictions

---

## 🎯 Bottom Line

Your chatbot is:
- ✅ **Full-stack**: React (frontend) + Express (backend) + Gemini (AI)
- ✅ **Streaming-based**: SSE for real-time responses
- ✅ **Stateless**: No database needed
- ✅ **Scalable**: Can deploy to any Node.js host
- ✅ **Simple**: Single API endpoint, easy to understand
- ✅ **Production-ready**: Deploy to Railway/Vercel in 5 minutes

Ready to go live! 🚀

