# SNJB College Chatbot

## Overview
A chatbot widget overlay for SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering website. The chatbot provides information about admissions, courses, fees, placements, cutoffs, hostel facilities, contact information, lateral entry (DSE), and training & placement support.

## Architecture
- **Frontend**: React + Vite with Tailwind CSS, Framer Motion for animations
- **Backend**: Express.js with pattern-matching chatbot logic
- **No database needed** - stateless rule-based chatbot

## Key Files
- `client/src/components/chatbot-widget.tsx` - Main chatbot overlay widget
- `client/src/lib/chatbotData.ts` - Client-side knowledge base and welcome message
- `server/chatbot.ts` - Server-side intent matching and response logic
- `server/routes.ts` - API endpoint `/api/chat` (POST)
- `client/src/pages/home.tsx` - Placeholder page showing website screenshots

## API
- `POST /api/chat` - Send `{ message: string }`, returns `{ text: string, quickReplies?: string[] }`

## Chatbot Features
- Floating chat button with tooltip on bottom-right
- Animated open/close with Framer Motion
- Quick reply buttons for common topics
- Markdown rendering (bold, links, tables, lists)
- Typing indicator animation
- Reset chat / scroll to bottom controls
- 10 knowledge categories: About, Courses, Admissions, Fees, Placements, Cutoffs, Hostel, Contact, DSE, Training

## Theme
- Navy blue primary color (`hsl(215, 80%, 28%)`)
- Orange accent (`hsl(30, 85%, 52%)`)
- Poppins font family
