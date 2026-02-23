# SNJB College Chatbot

## Overview
A chatbot widget overlay for SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering website. The chatbot uses AI (Gemini via Google Generative AI) to provide personalized, context-aware responses about the college - including admissions, courses, fees, placements, cutoffs, hostel facilities, contact information, lateral entry (DSE), and training & placement support.

## Architecture
- **Frontend**: React + Vite with Tailwind CSS, Framer Motion for animations
- **Backend**: Express.js with Gemini-powered AI chatbot (streaming SSE responses)
- **AI Model**: gemini-2.0-flash via Google Generative AI (requires GEMINI_API_KEY)
- **No database needed** - conversation history maintained client-side per session

## Key Files
- `client/src/components/chatbot-widget.tsx` - Main chatbot overlay widget with streaming support
- `server/chatbot.ts` - AI chatbot logic with comprehensive college knowledge base as system prompt
- `server/routes.ts` - API endpoint `/api/chat` (POST, SSE streaming)
- `shared/schema.ts` - Request/response schemas
- `client/src/pages/home.tsx` - Placeholder page showing website screenshots

## API
- `POST /api/chat` - Send `{ message: string, history: [{role, content}] }`, returns SSE stream:
  - `data: {"type":"text","content":"..."}\n\n` (streamed text chunks)
  - `data: {"type":"done","quickReplies":[...]}\n\n` (completion signal)

## Chatbot Features
- AI-powered personalized responses (not hardcoded pattern matching)
- Context-aware follow-up questions using conversation history
- Real-time streaming text display (like ChatGPT)
- Floating chat button with tooltip on bottom-right
- Animated open/close with Framer Motion
- Quick reply buttons for common topics
- Markdown rendering (bold, links, tables, lists)
- Typing indicator (bouncing dots while AI generates)
- Reset chat / scroll to bottom controls
- 10 knowledge categories: About, Courses, Admissions, Fees, Placements, Cutoffs, Hostel, Contact, DSE, Training

## Theme
- Navy blue primary color (`hsl(215, 80%, 28%)`)
- Orange accent (`hsl(30, 85%, 52%)`)
- Poppins font family
