# 📚 GitHub Repository Setup Guide

## Step 1: Create GitHub Account (If You Don't Have One)

1. Go to **https://github.com**
2. Click **"Sign up"**
3. Enter your email
4. Create password
5. Choose username (e.g., `MyAIGuru` or similar)
6. Verify email
7. Complete setup

---

## Step 2: Create a New Repository on GitHub

### Via GitHub Website:

1. Go to **https://github.com/new**
2. Fill in details:
   - **Repository name**: `snjb-chatbot` (or `Web-Companion-Chat`)
   - **Description**: "AI-powered chatbot for SNJB College admissions and information"
   - **Visibility**: Choose `Public` (if 100% okay sharing) or `Private` (safer)
   - **Initialize with README**: ✅ Check this
   - **Add .gitignore**: Select `Node` from dropdown
   - **License**: Choose `MIT` (good for open source)

3. Click **"Create repository"**

4. You'll see the repo URL like: 
   ```
   https://github.com/YOUR-USERNAME/snjb-chatbot.git
   ```

---

## Step 3: Initialize Git Locally

Open PowerShell in your project folder:

```powershell
cd C:\Users\MyAIGuru\Desktop\Web-Companion-Chat
```

### Check if git is already initialized:
```powershell
git status
```

If you see "fatal: not a git repository", continue below.

### Initialize git:
```powershell
git init
```

### Add GitHub as remote:
```powershell
# Replace with your actual repo URL
git remote add origin https://github.com/YOUR-USERNAME/snjb-chatbot.git

# Verify it worked:
git remote -v
```

---

## Step 4: Add Files to Git

### Check what files are ready to commit:
```powershell
git status
```

You should see files like:
- `server/chatbot.ts`
- `client/src/components/chatbot-widget.tsx`
- `package.json`
- etc.

### Add all files to staging:
```powershell
git add .
```

### Check what's staged:
```powershell
git status
```

Should say "Changes to be committed"

---

## Step 5: Create Your First Commit

```powershell
git commit -m "Initial commit: SNJB Chatbot with Gemini AI integration"
```

You should see output like:
```
[main abc123] Initial commit...
 XX files changed, XXXX insertions(+)
 create mode 100644 package.json
 ...
```

---

## Step 6: Set Git Configuration (First Time Only)

If you see error about user name, run:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Then retry the commit above.

---

## Step 7: Push to GitHub

### For the first push:
```powershell
git branch -M main
git push -u origin main
```

You may be prompted for authentication:
- **Option A**: Use GitHub CLI (easier)
- **Option B**: Use Personal Access Token (PAT)

### If prompted for password:

**GitHub no longer accepts passwords for git operations.**

Instead, use one of these:

#### Option 1: GitHub CLI (Easiest)

```powershell
# 1. Download GitHub CLI from https://cli.github.com
# 2. Install it
# 3. Run this to authenticate:
gh auth login

# Then it will:
# - Ask for protocol: choose "HTTPS"
# - Ask for authentication: choose "Login with a web browser"
# - Return to terminal and try pushing again:
git push -u origin main
```

#### Option 2: Personal Access Token (PAT)

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → "Generate new token (classic)"
3. Give it a name: `git-cli` or `github-access`
4. Check these scopes:
   - ✅ `repo` (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you'll only see it once!)

7. Back in PowerShell, when asked for password, paste the token

---

## Step 8: Verify on GitHub

1. Go to **https://github.com/YOUR-USERNAME/snjb-chatbot**
2. You should see:
   - All your files and folders
   - `README.md` file
   - `.gitignore` file
   - Your commit message

---

## Step 9: Add Important Files to .gitignore

Before pushing again, make sure sensitive files are ignored:

1. Open `.gitignore` in your project
2. Add these lines (if not already there):

```
# Environment variables (NEVER commit API keys!)
.env
.env.local
.env.*.local

# Dependencies
node_modules/
package-lock.json

# Build output
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

3. Save the file
4. Run:
```powershell
git add .gitignore
git commit -m "Update .gitignore with sensitive files"
git push
```

---

## Step 10: Verify .env is NOT Committed

⚠️ **IMPORTANT**: Make sure `.env` is NOT on GitHub!

```powershell
git log --name-only | findstr ".env"
```

If `.env` appears, run:
```powershell
# Remove it from git history
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

---

## Complete Commands Cheat Sheet

```powershell
# One-time setup
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
gh auth login

# In your project folder (one-time)
git init
git remote add origin https://github.com/USERNAME/snjb-chatbot.git

# Regular workflow (after making changes)
git status                    # See what changed
git add .                     # Stage all changes
git commit -m "Description"  # Commit with message
git push                      # Push to GitHub
```

---

## Common Commands

```powershell
# Check git status
git status

# See recent commits
git log --oneline

# View changes in a file
git diff filename.txt

# Undo uncommitted changes
git restore filename.txt

# Check remote URL
git remote -v

# Change remote URL
git remote set-url origin https://github.com/USERNAME/new-repo.git
```

---

## Troubleshooting

### Error: "fatal: not a git repository"
Solution:
```powershell
git init
git remote add origin https://github.com/USERNAME/snjb-chatbot.git
```

### Error: "Please tell me who you are"
Solution:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Error: "Authentication failed"
Solution:
```powershell
# Use GitHub CLI
gh auth login

# Or use Personal Access Token instead of password
```

### Files not showing on GitHub
Solution:
1. Make sure you did `git add .`
2. Make sure you did `git commit -m "message"`
3. Make sure you did `git push`
4. Refresh GitHub page

---

## Next Steps After Creating Repo

1. **Add deployment-related files**:
   ```powershell
   git add DEPLOYMENT_GUIDE.md QUICK_START_DEPLOYMENT.md DEPLOYMENT_CHECKLIST.md
   git add SAMPLE_WEBSITE_INTEGRATION.html
   git commit -m "Add deployment guides"
   git push
   ```

2. **Update README.md** in GitHub to include:
   - Project description
   - Features
   - Installation steps
   - Deployment instructions
   - Team info

3. **Share the GitHub URL** with your team:
   - Example: `https://github.com/MyAIGuru/snjb-chatbot`

---

## You're Done! 🎉

Your code is now safely backed up on GitHub and ready for:
- ✅ Deployment to Railway/Vercel/Render (they all support GitHub)
- ✅ Collaboration with team members
- ✅ Version control (undo changes if needed)
- ✅ Public sharing/portfolio

**Next step**: Use this GitHub repo when deploying to Production!

