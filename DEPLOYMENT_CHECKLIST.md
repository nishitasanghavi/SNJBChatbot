# 🚀 SNJB Chatbot - Deployment Checklist

## Phase 1: Local Testing ✅

- [ ] Clone/open the project in VS Code
- [ ] Run `npm install` (if not done)
- [ ] Run `npm run dev`
- [ ] Visit http://127.0.0.1:3000
- [ ] Test chatbot with questions like:
  - "Tell me about admissions"
  - "What are the courses?"
  - "Who is the HOD of Computer Engineering?"
  - "What's the weather?" (should refuse)
- [ ] Verify it works correctly

## Phase 2: Production Build ✅

```powershell
# Build for production
npm run build

# Test production build locally
npm start

# Visit http://127.0.0.1:3000 and verify it works
```

- [ ] Build completes without errors
- [ ] Production version loads correctly
- [ ] Chatbot responds on production build

## Phase 3: Choose Deployment Platform ✅

Select ONE platform:

### Option A: Railway (Recommended - Fastest)
- [ ] Go to https://railway.app
- [ ] Sign in with GitHub
- [ ] Create New Project
- [ ] Select your GitHub repository
- [ ] Click "Deploy"
- [ ] Wait for deployment (usually 3-5 minutes)
- [ ] Go to Settings → Environment
- [ ] Add variables:
  - [ ] `GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
  - [ ] `NODE_ENV=production`
- [ ] Railway auto-redeploys
- [ ] Copy your Railway URL (e.g., https://web-production-xxx.railway.app)

### Option B: Vercel
- [ ] Go to https://vercel.com
- [ ] Click "Add New Project"
- [ ] Import Repository (select your GitHub repo)
- [ ] Configure:
  - [ ] Framework: "Other"
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add Environment Variables:
  - [ ] `GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
- [ ] Click "Deploy"
- [ ] Copy your Vercel URL (e.g., https://project-name.vercel.app)

### Option C: Render
- [ ] Go to https://render.com
- [ ] Sign in with GitHub
- [ ] Click "New +" → Web Service
- [ ] Connect GitHub repo
- [ ] Use these settings:
  - [ ] Name: `snjb-chatbot`
  - [ ] Environment: `Node`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm start`
  - [ ] Add `GEMINI_API_KEY` environment variable
- [ ] Click "Create Web Service"
- [ ] Copy your Render URL (e.g., https://snjb-chatbot.onrender.com)

## Phase 4: Verify Production Deployment ✅

Once deployed:

- [ ] Visit your deployed URL in browser
  - Should show the chatbot page
  - Should say "Online"

- [ ] Test the API with curl/PowerShell:
  ```powershell
  # Replace with your actual URL
  $url = "https://your-deployed-url.com/api/chat"
  $body = @{
      message = "Tell me about admissions"
      history = @()
  } | ConvertTo-Json
  
  Invoke-WebRequest -Uri $url -Method POST `
    -ContentType "application/json" `
    -Body $body -UseBasicParsing
  ```
  - [ ] Should return SSE stream with responses
  - [ ] Should NOT return errors

## Phase 5: Website Integration ✅

### For Static HTML/Website:

- [ ] Open your website HTML file
- [ ] Add this script before `</body>` tag:

```html
<script>
(function() {
  const BACKEND_URL = 'https://your-deployed-url.com'; // ← Update this
  
  const container = document.createElement('div');
  container.id = 'snjb-chatbot-widget';
  document.body.appendChild(container);
  
  const iframe = document.createElement('iframe');
  iframe.src = BACKEND_URL;
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

- [ ] Replace `https://your-deployed-url.com` with your actual deployed URL
- [ ] Save the file
- [ ] Upload to your web server

### For WordPress:
- [ ] Go to Plugins → Add New
- [ ] Search "Custom HTML"
- [ ] Install & activate plugin
- [ ] Create new Custom HTML widget
- [ ] Paste the embed script
- [ ] Place in footer or sidebar
- [ ] Publish

### For Other Platforms (Wix, Squarespace, etc.):
- [ ] Follow platform's "Add Custom Code" instructions
- [ ] Paste the embed script
- [ ] Save & publish

## Phase 6: Testing on Live Website ✅

- [ ] Load your website
- [ ] Chatbot widget appears in bottom-right corner
- [ ] Click/tap to open
- [ ] Send test message: "Tell me about admissions"
- [ ] Verify:
  - [ ] Chatbot responds (takes 1-3 seconds)
  - [ ] Response is about SNJB admissions
  - [ ] Quick reply buttons appear
  - [ ] Widget can be closed (X button)
  - [ ] Widget can be reopened

## Phase 7: Security Check ✅

- [ ] Website uses HTTPS (not HTTP)
- [ ] GEMINI_API_KEY is NOT visible in HTML source
- [ ] GEMINI_API_KEY is set in platform environment (not in code)
- [ ] Test off-topic question: "What's the weather?"
  - [ ] Bot refuses and redirects to college topics
  - [ ] Bot acts appropriately

## Phase 8: Performance & Monitoring ✅

### After going live:
- [ ] Check deployed app logs for errors
- [ ] Monitor API response times (should be < 5 seconds)
- [ ] Check Gemini API usage in Google Cloud Console
- [ ] Set up error notifications (optional)
- [ ] Set up analytics to track usage (optional)

## Phase 9: Documentation ✅

Record for future reference:
- [ ] Your deployed URL: ____________________________
- [ ] Deployment platform: ____________________________
- [ ] GEMINI_API_KEY is set in: [Platform] → Settings → Variables
- [ ] Website URL where chatbot is embedded: ____________________________
- [ ] Last updated: ____________________________

## Troubleshooting Tips

### Chatbot not showing on website?
```
❌ Solution 1: Check browser console (F12) for CORS errors
❌ Solution 2: Verify URL in embed script is correct
❌ Solution 3: Clear browser cache and refresh
```

### Slow responses?
```
❌ Check Gemini API quota
❌ Verify network connection
❌ Check deployment platform logs
```

### API not responding?
```
❌ Verify deployment completed successfully
❌ Check environment variables are set
❌ Check deployment platform logs for errors
```

### "Port already in use" locally?
```powershell
# Kill process using port 3000
netstat -ano | findstr ":3000"
taskkill /PID <PID> /F
```

## Quick Reference Links

- 📋 **Railway**: https://railway.app
- 📋 **Vercel**: https://vercel.com
- 📋 **Render**: https://render.com
- 📋 **Google Cloud Console** (monitor Gemini): https://console.cloud.google.com
- 📋 **Your Project**: [Add your GitHub repo link]

## Timeline Estimate

| Phase | Time |
|-------|------|
| Local Testing | 5 min |
| Production Build | 2 min |
| Platform Setup | 5-10 min |
| Verification | 3 min |
| Website Integration | 5 min |
| Testing | 5 min |
| **TOTAL** | **~30 minutes** |

---

✅ **After completing all steps, your chatbot will be live on your website!**

🎉 Congratulations! Your SNJB Chatbot is now serving users.

