# Quick Integration Guide for Your Website

## 🎯 3-Step Deployment & Integration

### STEP 1: Build & Test Locally (1 minute)
```powershell
npm run build
npm start
# Visit: http://127.0.0.1:3000
```

### STEP 2: Deploy to Production (5 minutes)

**Choose ONE platform:**

#### 🔷 Option A: Railway (Easiest)
1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project → Select your repo
4. Go to Variables → Add:
   - `GEMINI_API_KEY=AIzaSyBSW-NdtGvxRGS_PN5hBC-KM9L0HJmdyHY`
   - `NODE_ENV=production`
5. Railway auto-deploys
6. Copy your URL (looks like: `https://web-production-xxxx.railway.app`)

#### 🔷 Option B: Vercel
1. Go to https://vercel.com
2. Click "Add New..." → Project
3. Import your GitHub repo
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy
6. Copy your URL (looks like: `https://project-name.vercel.app`)

#### 🔷 Option C: Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy
6. Copy your URL

### STEP 3: Add to Your Website (Copy-Paste)

Replace `https://your-deployed-url.com` with your actual URL from Step 2.

#### For HTML/Static Website:
Add this to your website HTML (inside `<body>` tag):

```html
<!-- SNJB Chatbot Widget -->
<script>
(function() {
  // ⚠️ CHANGE THIS TO YOUR DEPLOYED URL
  const BACKEND_URL = 'https://your-deployed-url.com';
  
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
    font-family: Poppins, sans-serif;
  `;
  container.appendChild(iframe);
})();
</script>
```

#### For WordPress:
1. Go to Plugins → Add New
2. Search "Custom HTML"
3. Install & activate
4. Create new widget with the above script
5. Place on your website

#### For React/Next.js:
```jsx
export default function YourPage() {
  return (
    <>
      <div>Your page content</div>
      
      <script>
      {`(function() {
        const BACKEND_URL = 'https://your-deployed-url.com';
        const container = document.createElement('div');
        container.id = 'snjb-chatbot-widget';
        document.body.appendChild(container);
        
        const iframe = document.createElement('iframe');
        iframe.src = BACKEND_URL;
        iframe.style.cssText = \`
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
        \`;
        container.appendChild(iframe);
      })()`}
      </script>
    </>
  );
}
```

#### For Shopify:
1. Go to Online Store → Themes → Edit Code
2. Open `footer.liquid`
3. Add the script before `</body>`
4. Save & publish

---

## ✅ Testing Checklist

- [ ] Deploy to Railway/Vercel/Render
- [ ] Get your deployed URL
- [ ] Test backend: Visit `https://your-url.com` (should show chatbot page)
- [ ] Test API: 
  ```bash
  curl -X POST https://your-url.com/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"Tell me about admissions","history":[]}'
  ```
- [ ] Add embed script to your website
- [ ] Refresh your website
- [ ] Chatbot appears bottom-right ✓
- [ ] Send test message "What are the courses?" ✓
- [ ] Bot responds about SNJB ✓
- [ ] Ask off-topic question to verify filtering works ✓

---

## 📍 Your Deployment URLs

Once deployed, save these URLs:

| Service | URL |
|---------|-----|
| Backend/API | `https://your-deployed-url.com` |
| Chat API Endpoint | `https://your-deployed-url.com/api/chat` |
| Widget for Website | Same as Backend URL |

---

## 🔧 Common Issues

### Issue: "Port 3000 already in use"
**Solution:** 
```powershell
# Windows
netstat -ano | findstr ":3000"
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: "GEMINI_API_KEY not set"
**Solution:** Make sure you added it to your platform's environment variables

### Issue: "Chatbot not showing on website"
**Solution:** 
1. Check if URL is correct in embed script
2. Check browser console (F12) for errors
3. Verify backend URL is HTTPS

---

## 💡 Tips

- Keep your GEMINI_API_KEY private (never commit to GitHub)
- The chatbot only responds to SNJB-related questions
- Customize SYSTEM_PROMPT in `server/chatbot.ts` to change behavior
- Monitor your Gemini API usage to avoid unexpected costs

---

## 🎓 Full Documentation
See `DEPLOYMENT_GUIDE.md` for detailed options and troubleshooting.

