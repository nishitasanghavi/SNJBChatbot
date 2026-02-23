# 🚀 Deploy Frontend (Vercel) + Backend (Render) + UptimeRobot

## Overview
- **Frontend (React)**: Vercel (fast, CDN-optimized)
- **Backend (Express API)**: Render (affordable, free tier)
- **Keep-Alive**: UptimeRobot (prevents backend from sleeping)

**Total Setup Time**: ~20 minutes

---

## PART 1: Deploy Backend to Render

### Step 1.1: Create Render Account
1. Go to **https://render.com**
2. Click **"Sign up"**
3. Sign up with GitHub (easiest)
4. Authorize Render to access your GitHub

### Step 1.2: Create Web Service on Render
1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo:
   - Select your repo: `snjb-chatbot` (or your repo name)
   - Click **"Connect"**

### Step 1.3: Configure Render Web Service
Fill in these settings:

```
Name:                snjb-chatbot-backend
Environment:         Node
Region:              Choose closest to your users (default is fine)
Build Command:       npm install && npm run build
Start Command:       npm start
```

Leave other settings as default.

### Step 1.4: Add Environment Variables
Before deploying, add variables:

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | `AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY` |
| `NODE_ENV` | `production` |

4. Click **"Create Web Service"**

### Step 1.5: Wait for Deployment
- Render will build and deploy automatically
- Check the logs (should complete in 2-3 minutes)
- You'll see: **"✓ Deploy successful"**

### Step 1.6: Get Your Backend URL
1. Go to your Web Service dashboard
2. Top of page shows your URL like:
   ```
   https://snjb-chatbot-backend.onrender.com
   ```
3. **Copy this URL** - you'll need it for frontend & UptimeRobot

### Step 1.7: Test Backend
```powershell
# Replace with your actual Render URL
curl -X POST https://snjb-chatbot-backend.onrender.com/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Tell me about admissions","history":[]}'

# Should return SSE stream with response
```

✅ **Backend is live!**

---

## PART 2: Deploy Frontend to Vercel

### Step 2.1: Create Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with GitHub
4. Authorize Vercel

### Step 2.2: Import Project
1. Click **"Add New"** → **"Project"**
2. Click **"Import Git Repository"**
3. Find and select your repo: `snjb-chatbot`
4. Click **"Import"**

### Step 2.3: Configure Project

Vercel should auto-detect settings, but verify:

```
Framework Preset:  Other
Build Command:     npm run build
Output Directory:  dist
Install Command:   npm install
```

### Step 2.4: Add Environment Variable for Backend URL

**IMPORTANT**: Tell frontend where backend is!

1. In Vercel, go to **"Settings"** tab
2. Go to **"Environment Variables"**
3. Add this variable:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_API_URL` | `https://snjb-chatbot-backend.onrender.com` | Production, Preview, Development |

(Replace with YOUR Render URL from Step 1.6)

### Step 2.5: Deploy
1. Click **"Deploy"**
2. Wait for deployment (usually 1-2 minutes)
3. You'll see:
   ```
   ✓ Production Deployment Completed
   Domains: https://snjb-chatbot.vercel.app
   ```

4. **Copy your Vercel URL** (this is your frontend!)

### Step 2.6: Test Frontend
1. Visit: `https://snjb-chatbot.vercel.app`
2. Should show chatbot widget
3. Try sending message: "Tell me about admissions"
4. Should stream response from Render backend ✅

✅ **Frontend is live!**

---

## PART 3: Setup UptimeRobot to Keep Backend Alive

Render's free tier puts apps to sleep after 15 min of inactivity. UptimeRobot pings it to keep it awake.

### Step 3.1: Create UptimeRobot Account
1. Go to **https://uptimerobot.com**
2. Click **"Sign Up"** (free tier is fine)
3. Verify email

### Step 3.2: Create Monitoring

1. Log in to UptimeRobot
2. Click **"Add Monitor"** (or + New Monitor)
3. Fill in:

```
Monitor Type:        HTTP(s)
Friendly Name:       SNJB Chatbot Backend Keep-Alive
URL (or IP):         https://snjb-chatbot-backend.onrender.com/
Monitoring Interval: Every 5 minutes
```

4. Click **"Create Monitor"**

### Step 3.3: Verify It's Working
1. Wait 5 minutes
2. Check UptimeRobot dashboard
3. Should show **"Up"** status ✅
4. Your Render backend will now stay awake!

---

## Integration: Connect Frontend to Backend

### Update Frontend Code (if needed)

If API calls aren't working, update the frontend to use your Render URL:

1. Open: `client/src/components/chatbot-widget.tsx`
2. Find: `fetch("/api/chat"...`
3. Change to: `fetch("https://snjb-chatbot-backend.onrender.com/api/chat"...`
4. Commit and push to GitHub
5. Vercel will auto-redeploy ✅

**Better approach**: Use environment variable:

In `client/src/components/chatbot-widget.tsx`:
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Then use:
fetch(`${API_BASE}/api/chat`, ...)
```

---

## Summary of URLs

After deployment, you'll have:

| Component | URL | Platform |
|-----------|-----|----------|
| **Frontend** | `https://snjb-chatbot.vercel.app` | Vercel |
| **Backend API** | `https://snjb-chatbot-backend.onrender.com` | Render |
| **Chat Endpoint** | `https://snjb-chatbot-backend.onrender.com/api/chat` | Render |
| **Uptime Monitor** | https://uptimerobot.com dashboard | UptimeRobot |

---

## 🧪 Testing Everything

### Test 1: Backend is running
```powershell
curl https://snjb-chatbot-backend.onrender.com/

# Should return HTML
```

### Test 2: API works
```powershell
curl -X POST https://snjb-chatbot-backend.onrender.com/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Tell me about admissions","history":[]}'

# Should return SSE stream
```

### Test 3: Frontend loads
Visit: `https://snjb-chatbot.vercel.app`
- Should show chatbot page
- Widget should appear

### Test 4: Chat works
1. Click chatbot widget
2. Type: "Tell me about admissions"
3. Should receive response from Render backend
4. Response should stream (letter by letter)

---

## Troubleshooting

### Frontend shows blank page
- Check Vercel deployment logs
- Verify VITE_API_URL environment variable

### Chat doesn't work
- Check if backend is running: Visit `https://snjb-chatbot-backend.onrender.com/`
- Check Render logs for errors
- Verify GEMINI_API_KEY is set in Render

### Backend goes to sleep
- Make sure UptimeRobot monitor is active
- Check UptimeRobot dashboard - should show "Up"
- Monitor interval should be 5 minutes

### "CORS error" in browser
- Add this to Express app (if needed):
```typescript
const cors = require('cors');
app.use(cors());
```

---

## Costs

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | **FREE** | Perfect for React apps |
| Render | **FREE** (with limit) | Free tier has some restrictions |
| UptimeRobot | **FREE** | Free tier is sufficient |
| Gemini API | ~**FREE** | Free tier available |
| **TOTAL** | **$0/month** | Yes, totally free! |

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Add UptimeRobot monitor
4. ✅ Test chat functionality
5. ✅ Share links with team

**Your chatbot is now live!** 🎉

**Frontend URL to share**: `https://snjb-chatbot.vercel.app`

---

## Quick Command Reference

```powershell
# Test backend
curl https://snjb-chatbot-backend.onrender.com/

# Test API
curl -X POST https://snjb-chatbot-backend.onrender.com/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"test","history":[]}'

# View Vercel logs
# Go to: https://vercel.com/dashboard

# View Render logs
# Go to: https://dashboard.render.com → Select service → Logs

# View UptimeRobot status
# Go to: https://uptimerobot.com/dashboard
```

---

## Final Verification Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied: `https://snjb-chatbot-backend.onrender.com`
- [ ] Environment variables set in Render (GEMINI_API_KEY, NODE_ENV)
- [ ] Backend tested (curl returns response)
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied: `https://snjb-chatbot.vercel.app`
- [ ] VITE_API_URL set in Vercel to Render backend URL
- [ ] Frontend tested (page loads, no errors)
- [ ] Chat works end-to-end (message → response)
- [ ] UptimeRobot monitor created
- [ ] UptimeRobot shows "Up" status
- [ ] Shared frontend URL with team

🎉 **ALL DONE!** Your production chatbot is live!

