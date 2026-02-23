# 🔄 Loading State: "Waking up server..." Feature

## What is This?

When Render's free tier puts your backend to sleep (after 15 min of inactivity), the first request takes 30+ seconds. This feature shows **"Waking up server..."** to the user so they know what's happening instead of seeing a frozen chat.

---

## How It Works

### Timeline

```
User clicks send button
    ↓ (0 sec)
Request starts to backend
    ↓ (2 sec - no response yet)
"Waking up server..." message appears ← Your new feature
    ↓ (continues...)
Backend finishes initializing
    ↓ (30+ sec)
Response arrives
    ↓
"Waking up server..." message disappears
    ↓
Real response displays
```

---

## Code Changes

### 1. **New State Variables Added**

```typescript
const [isWakingUp, setIsWakingUp] = useState(false);           // Track if showing wakeup screen
const [hasTriedFirstRequest, setHasTriedFirstRequest] = useState(false); // Only show once
```

### 2. **Wakeup Detection Logic**

```typescript
// Show "Waking up server..." for first request if it's slow
let wakingUpTimeout: ReturnType<typeof setTimeout> | null = null;
if (!hasTriedFirstRequest) {
  setHasTriedFirstRequest(true);
  wakingUpTimeout = setTimeout(() => {
    if (!isTyping) return; // Already finished
    setIsWakingUp(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `waking-up-${Date.now()}`,
        content: "Waking up server... This may take a moment on first load.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, 2000); // Show message if request takes more than 2 seconds
}
```

**What this does:**
- Waits 2 seconds for a response
- If no response in 2 seconds, shows user the message
- Only shows on the FIRST request (not every request)

### 3. **Cleanup When Response Arrives**

```typescript
// Clear the waking up timeout since we got a response
if (wakingUpTimeout) clearTimeout(wakingUpTimeout);
if (isWakingUp) {
  setIsWakingUp(false);
  // Remove the waking up message
  setMessages((prev) => prev.filter((m) => !m.id.startsWith("waking-up-")));
}
```

**What this does:**
- When backend responds, removes the "waking up" message
- Shows the actual response instead
- Cleans up all timeout references

### 4. **Production Backend URL Support**

```typescript
// Use environment variable for production, fallback to local for development
const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/chat` : "/api/chat";

const res = await fetch(apiUrl, {
  // ... rest of fetch
});
```

**What this does:**
- In development: uses local `/api/chat`
- In production: uses `VITE_API_URL` environment variable (set in Vercel)
- Points to Render backend URL on production

---

## Configuration

### For Development (Local)

No changes needed - it will use `/api/chat` (local backend)

```bash
npm run dev
# Uses: http://localhost:3000/api/chat
```

### For Production (Vercel + Render)

**In Vercel Settings → Environment Variables:**

Add:
```
VITE_API_URL = https://snjb-chatbot-backend.onrender.com
```

(Replace with your actual Render URL)

This tells the frontend where the backend is running.

### Optional: Local .env File

Create `.env.local` for local testing:

```
VITE_API_URL=http://localhost:3000
```

When you want to test with a remote backend locally.

---

## User Experience

### Scenario 1: Backend is Awake (Normal)
```
User: "Tell me about admissions"
      ↓ (1-3 seconds)
Bot: "SNJB College offers admissions..."
```
(No "waking up" message - response is fast)

### Scenario 2: Backend is Asleep (First Request)
```
User: "Tell me about admissions"
      ↓ (2 seconds)
Bot: "Waking up server... This may take a moment on first load."
      ↓ (28 more seconds)
Bot: "SNJB College offers admissions..." [waking message disappears]
```

### Scenario 3: Subsequent Requests (Backend Already Awake)
```
(Thanks to UptimeRobot pinging every 5 min, backend stays awake)
User: "What are the fees?"
      ↓ (1-3 seconds)
Bot: "B.Tech Fees (2025-26)..."
```
(No waking message - backend is already running)

---

## Message Styling

The "waking up" message appears as a normal bot message:
- Blue/dark background (same as other bot messages)
- Displays for as long as the backend is initializing
- Automatically replaced with actual response when it arrives
- Timestamped like other messages

---

## Timing Configuration

You can adjust when the message appears by changing this line:

```typescript
}, 2000); // Change 2000 to desired milliseconds
```

| Value | When it Shows |
|-------|--------------|
| 1000 | After 1 second (aggressive) |
| 2000 | After 2 seconds (default, balanced) |
| 5000 | After 5 seconds (generous) |

**Recommendation:** Keep at 2000ms - it provides good UX without being too early.

---

## Technical Details

### Why 2 Seconds?

- **SSE streaming** starts first (fast, ~100ms)
- Render free tier cold start is **30-60 seconds**
- Showing message after 2 seconds gives user context
- Feels natural to the user

### Why Only First Request?

- After UptimeRobot pings (every 5 min), backend stays awake
- Subsequent requests are fast (1-3 sec)
- No need to show "waking up" message every time

### How UptimeRobot Helps

UptimeRobot pings your backend every 5 minutes:
```
Ping request → Backend wakes up from sleep
```

So your backend is almost always ready to respond quickly!

---

## Testing the Feature

### Test Locally

1. Start dev server:
```bash
npm run dev
```

2. Kill your backend process:
```bash
# In another terminal
taskkill /PID <PID> /F  # Windows
kill <PID>              # Mac/Linux
```

3. Try to chat (will timeout)
4. You'll see "Waking up server..." after 2 seconds
5. Restart backend (it won't actually respond, but feature works)

### Test on Production

1. Deploy to Render + Vercel
2. Stop visiting the site for 15+ minutes
3. UptimeRobot keeps it slightly warm, but a real request will be slow
4. Send first message
5. Should see "Waking up server..." message for a moment
6. Then real response appears

---

## Troubleshooting

### Message Never Disappears

**Cause:** Backend is crashed or API URL is wrong

**Solution:**
- Check Render backend status
- Verify `VITE_API_URL` in Vercel environment variables
- Check browser console (F12) for errors

### Message Shows Every Time

**Cause:** Requests are actually slow (network issue, not cold start)

**Solution:**
- Increase the timeout from 2000 to 5000ms
- Check network speed (F12 → Network tab)
- Check Gemini API response time

### Message Shows but Backend isn't Actually Waking Up

**Cause:** Request is timing out entirely

**Solution:**
- Check if backend is running at all
- Ping it directly: `curl https://snjb-chatbot-backend.onrender.com/`
- Check GEMINI_API_KEY is set in Render

---

## Files Modified

1. **`client/src/components/chatbot-widget.tsx`**
   - Added state variables
   - Added wakeup timeout logic
   - Updated API URL handling

2. **`.env.example`** (new file)
   - Documents environment variables
   - Shows how to configure for production

---

## Environment Variables Summary

| Variable | Purpose | Dev Value | Prod Value |
|----------|---------|-----------|-----------|
| `VITE_API_URL` | Backend API endpoint | (empty) | `https://snjb-chatbot-backend.onrender.com` |

---

## Production Checklist

- [ ] Backend deployed to Render
- [ ] Render URL copied: `https://snjb-chatbot-backend.onrender.com`
- [ ] UptimeRobot monitor created and showing "Up"
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set in Vercel environment variables
- [ ] Tested first request (should show "waking up" message)
- [ ] Tested subsequent requests (should be fast)
- [ ] Verified message disappears when response arrives

---

## Summary

✅ **What this feature does:**
- Shows "Waking up server..." when backend is cold-starting
- Only shows on first request
- Disappears when actual response arrives
- Improves user experience on Render's free tier

✅ **Why it helps:**
- Users know the app isn't broken
- Sets expectations for first-load delay
- Better UX than blank screen or timeout

✅ **How to use:**
- No configuration needed for development
- Set `VITE_API_URL` in Vercel for production
- Rest happens automatically

🚀 **Result:** Transparent and user-friendly cold start experience!

