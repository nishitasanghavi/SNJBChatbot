# SNJB Chatbot - Production Deployment Guide

## 📋 Table of Contents
1. [Build & Prepare](#build--prepare)
2. [Deployment Options](#deployment-options)
3. [Environment Setup](#environment-setup)
4. [Website Integration](#website-integration)
5. [Testing](#testing)

---

## 🏗️ Build & Prepare

### Step 1: Build the Project
```powershell
npm run build
```
This creates a `dist/` folder with:
- `index.cjs` - Production server bundle
- `client/` - Optimized React app

### Step 2: Test Production Build Locally
```powershell
npm start
```
Visit: http://127.0.0.1:3000 (should be fast and no Vite dev server)

---

## 🚀 Deployment Options

### Option A: Railway.app (Recommended - Easy & Free Tier)

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub
   - Allow Railway to access your repository

2. **Connect GitHub & Deploy**
   - Create new project → GitHub Repo
   - Select your repository
   - Railway auto-detects Node.js
   - Confirm and deploy

3. **Set Environment Variables**
   - Go to Project Settings → Variables
   - Add: `GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
   - Add: `NODE_ENV=production`
   - Railway redeploys automatically

4. **Get Your Public URL**
   - Dashboard shows your app URL
   - Example: `https://your-app-name.railway.app`
   - This is your chatbot endpoint!

---

### Option B: Vercel (Very Easy - Optimized for Node.js)

1. **Create Account & Import**
   - Go to https://vercel.com
   - Click "New Project"
   - Import from GitHub
   - Select your repository

2. **Configure Build Settings**
   - Framework: "Other"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./`

3. **Add Environment Variables**
   - In project settings → Environment Variables
   - Add: `GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
   - Save and redeploy

4. **Deploy**
   - Click "Deploy"
   - Get your domain: `https://your-project.vercel.app`

---

### Option C: Render.com (Great Free Tier)

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Service**
   - New → Web Service
   - Connect GitHub repo
   - Save and deploy

3. **Configure**
   - Name: `snjb-chatbot`
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add GEMINI_API_KEY in Environment

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your URL: `https://your-service.onrender.com`

---

## ⚙️ Environment Setup

### Production Environment Variables
Regardless of platform, add these:

```
GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY
NODE_ENV=production
PORT=3000
```

### Testing Your API
Once deployed, test the endpoint:
```powershell
$url = "https://your-deployed-url.com/api/chat"
$body = @{
    message = "Tell me about admissions"
    history = @()
} | ConvertTo-Json

Invoke-WebRequest -Uri $url -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
```

---

## 🔗 Website Integration

Once your backend is deployed, integrate the chatbot into your website:

### Method 1: Embed as Script (Recommended)

Add this to your website's `<head>` or before `</body>`:

```html
<!-- SNJB Chatbot Widget -->
<script>
  (function() {
    // Configuration
    const CHATBOT_BACKEND_URL = 'https://your-deployed-url.com'; // Replace with your deployment URL
    const CHATBOT_TITLE = 'SNJB Bot';
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'snjb-chatbot-widget';
    document.body.appendChild(widgetContainer);
    
    // Create chat iframe
    const iframe = document.createElement('iframe');
    iframe.src = CHATBOT_BACKEND_URL;
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
    widgetContainer.appendChild(iframe);
    
    // Pass backend URL to iframe
    iframe.onload = function() {
      iframe.contentWindow.postMessage({
        type: 'SET_API_URL',
        url: CHATBOT_BACKEND_URL
      }, '*');
    };
  })();
</script>
```

### Method 2: Direct Link for Standalone Page

If you want chatbot on a separate page:
```html
<a href="https://your-deployed-url.com" target="_blank" class="chat-button">
  Chat with SNJB Bot
</a>
```

### Method 3: Pop-up Modal

```html
<button id="chatbot-btn" onclick="openChatbot()">🤖 Ask SNJB Bot</button>

<script>
function openChatbot() {
  const chatURL = 'https://your-deployed-url.com';
  window.open(chatURL, 'SNJB-Chatbot', 'width=500,height=700,resizable=yes');
}
</script>
```

---

## 🧪 Testing

### Test 1: API Health
```
GET https://your-deployed-url.com/
Response: Should show HTML page
```

### Test 2: Chat Endpoint
```
POST https://your-deployed-url.com/api/chat
Body: {"message": "Tell me about admissions", "history": []}
Response: SSE stream with chat responses
```

### Test 3: Widget Integration
1. Add the embed script to your website
2. Refresh your site
3. Chatbot widget should appear bottom-right
4. Test sending messages

### Test 4: Different Questions
- ✅ "What courses are offered?"
- ✅ "Tell me about fees"
- ✅ "Who is the HOD of Computer Engineering?"
- ✅ "How do I apply?"
- ❌ "What's the weather?" (Should refuse, ask about college)

---

## 📊 Deployment Comparison

| Platform | Setup Time | Cost | Scalability | Ease |
|----------|-----------|------|-------------|------|
| Railway | 5 min | Free tier good | Good | ⭐⭐⭐⭐⭐ |
| Vercel | 5 min | Free tier good | Good | ⭐⭐⭐⭐⭐ |
| Render | 10 min | Free tier good | Good | ⭐⭐⭐⭐ |
| Self-hosted | 30 min | $$ | Very good | ⭐⭐⭐ |

**Recommendation:** Start with **Railway** or **Vercel** - simplest with free tier.

---

## 🔒 Security Checklist

- [ ] GEMINI_API_KEY is private (set in platform, not in code)
- [ ] Node ENV is set to `production`
- [ ] Your website uses HTTPS
- [ ] Test that chatbot refuses off-topic questions
- [ ] Monitor Gemini API usage in Google Cloud Console

---

## 📞 Troubleshooting

### "API not responding"
- Check if backend is running: `curl https://your-url.com/`
- Verify GEMINI_API_KEY is set in environment variables
- Check platform logs for errors

### "Chatbot not showing on website"
- Verify backend URL is correct in embed script
- Check browser console for CORS errors
- Ensure deployment URL is HTTPS

### "Slow responses"
- Check Gemini API quota
- Verify network connectivity
- Monitor backend performance

---

## 📈 Next Steps

After deployment:
1. Monitor usage via platform logs
2. Set up error tracking (Sentry, LogRocket)
3. Add analytics to track chatbot usage
4. Update knowledge base as needed
5. Scale backend if usage increases

---

## 🎯 Quick Start Summary

```bash
# 1. Build
npm run build

# 2. Test locally
npm start

# 3. Deploy to Railway/Vercel (5 min)
# 4. Copy your URL
# 5. Add embed script to your website
# 6. Update CHATBOT_BACKEND_URL in script
# 7. Done! 🎉
```

