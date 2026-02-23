# ⚡ Quick Deployment Checklist: Vercel + Render

## Phase 1: Prepare GitHub (Already Done ✅)
- [ ] Pushed code to GitHub
- [ ] `.env` is in `.gitignore` (NOT pushed)
- [ ] `npm run build` works locally

---

## Phase 2: Deploy Backend to Render (15 min)

### Create & Configure
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Click "New Web Service"
- [ ] Select your GitHub repo
- [ ] Set Name: `snjb-chatbot-backend`
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm start`

### Add Environment Variables in Render
- [ ] `GEMINI_API_KEY` = `AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
- [ ] `NODE_ENV` = `production`

### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build & deploy (2-3 min)
- [ ] Check logs - should see "Listening on port 3000"

### Get Backend URL
- [ ] Copy URL from dashboard: **https://snjb-chatbot-backend.onrender.com**
- [ ] Test: Visit it in browser (should show chatbot page)
- [ ] Test API: 
```powershell
curl -X POST https://snjb-chatbot-backend.onrender.com/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"test","history":[]}'
# Should get SSE response
```

---

## Phase 3: Deploy Frontend to Vercel (10 min)

### Create Account & Import
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repo

### Configure
- [ ] Framework: "Other" (or auto-detect)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Add Environment Variable
- [ ] Go to "Settings" → "Environment Variables"
- [ ] Add: `VITE_API_URL` = **https://snjb-chatbot-backend.onrender.com**
- [ ] Apply to: Production, Preview, Development

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (1-2 min)
- [ ] Copy frontend URL: **https://snjb-chatbot.vercel.app**

### Test
- [ ] Visit frontend URL in browser
- [ ] Should load without errors
- [ ] Try sending message
- [ ] Should get response from Render backend ✅

---

## Phase 4: Setup UptimeRobot (5 min)

### Why?
Render's free tier sleeps after 15 min of inactivity. UptimeRobot keeps it awake.

### Create Monitor
- [ ] Go to https://uptimerobot.com
- [ ] Sign up (free)
- [ ] Click "Add Monitor"
- [ ] Select: "HTTP(s)"
- [ ] Name: `SNJB Backend Keep-Alive`
- [ ] URL: `https://snjb-chatbot-backend.onrender.com/`
- [ ] Interval: Every 5 minutes
- [ ] Click "Create Monitor"

### Verify
- [ ] Monitor shows "Up" status ✅
- [ ] Check tomorrow - should still show "Up"

---

## Final Testing

### Test Each Component Separately

**1. Backend Direct Test:**
```powershell
# URL should respond
curl https://snjb-chatbot-backend.onrender.com/

# API should work
curl -X POST https://snjb-chatbot-backend.onrender.com/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Tell me about admissions","history":[]}'
```

**2. Frontend Load Test:**
- [ ] Visit: https://snjb-chatbot.vercel.app
- [ ] Page should load
- [ ] No error messages in console (F12)

**3. End-to-End Chat Test:**
- [ ] Click chatbot widget
- [ ] Type: "What courses do you offer?"
- [ ] Should see response stream from backend
- [ ] Quick reply buttons should appear
- [ ] Should NOT be an error message

**4. Off-Topic Question Test:**
- [ ] Type: "What's the weather?"
- [ ] Bot should refuse and redirect to college topics ✅

---

## Your Production URLs

**Save these!**

| Purpose | URL |
|---------|-----|
| **Frontend** | https://snjb-chatbot.vercel.app |
| **Backend** | https://snjb-chatbot-backend.onrender.com |
| **Chat API** | https://snjb-chatbot-backend.onrender.com/api/chat |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Render Dashboard** | https://dashboard.render.com |
| **UptimeRobot Dashboard** | https://uptimerobot.com/dashboard |

---

## Integration into Your Website

Once verified, add this to your website:

```html
<!-- SNJB Chatbot Widget -->
<script>
(function() {
  const CHATBOT_URL = 'https://snjb-chatbot.vercel.app';
  
  const container = document.createElement('div');
  container.id = 'snjb-chatbot-widget';
  document.body.appendChild(container);
  
  const iframe = document.createElement('iframe');
  iframe.src = CHATBOT_URL;
  iframe.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 380px;
    height: 600px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    background: white;
  `;
  container.appendChild(iframe);
})();
</script>
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Frontend shows blank | Check Vercel logs; verify VITE_API_URL set correctly |
| Chat doesn't work | Check if Render backend is running; check Render logs |
| CORS error | Backend URL might be wrong in VITE_API_URL |
| Backend slow to respond first time | Normal for Render free tier on cold start (30s max) |
| UptimeRobot shows "Down" | Check Render backend status; might have crashed |

---

## Monitoring (Going Forward)

**Daily:**
- [ ] Check UptimeRobot shows "Up"
- [ ] Spot check chatbot is responding

**Weekly:**
- [ ] Review Render logs for errors
- [ ] Check Vercel deployment status

**Monthly:**
- [ ] Monitor Gemini API usage
- [ ] Ensure no errors accumulating

---

## File Changes Made

If frontend needs to use backend URL, update this file:

**`client/src/components/chatbot-widget.tsx`**

Around line ~350, change:
```typescript
// OLD (local dev)
const response = await fetch('/api/chat', {

// NEW (production with separate backend)
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
```

But Vercel environment variable should handle this automatically! ✅

---

## Success Indicators ✅

- [ ] Frontend URL works in browser
- [ ] Backend URL responds to ping
- [ ] Chat sends message → gets response
- [ ] UptimeRobot shows "Up"
- [ ] No errors in browser console
- [ ] No errors in Render logs
- [ ] Response streams (not instant)
- [ ] Bot refuses off-topic questions

**When ALL checked: You're done!** 🎉

---

## Time Breakdown

| Task | Time |
|------|------|
| Backend setup (Render) | 15 min |
| Frontend setup (Vercel) | 10 min |
| UptimeRobot setup | 5 min |
| Testing & troubleshooting | 5-10 min |
| **TOTAL** | **35-40 min** |

**You can go live in under an hour!** 🚀

