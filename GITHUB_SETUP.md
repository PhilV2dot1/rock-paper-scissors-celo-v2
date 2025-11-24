# 📦 GitHub Repository Setup

Quick guide to create and push your Rock Paper Scissors project to GitHub.

## 🔗 Step 1: Create Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)

2. Fill in:
   ```
   Repository name: rock-paper-scissors-celo-v2
   Description: Rock Paper Scissors game on Celo blockchain with Farcaster integration
   ```

3. Choose **Public** or **Private**

4. **IMPORTANT**: Do NOT check any of these boxes:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

   (We already have these files!)

5. Click **"Create repository"**

## 📤 Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Copy your repository URL (it will look like `https://github.com/YOUR_USERNAME/rock-paper-scissors-celo-v2.git`).

Then run these commands in your terminal:

```bash
# Navigate to project directory
cd rock-paper-scissors-celo-v2

# Add GitHub as remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/rock-paper-scissors-celo-v2.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## ✅ Verify

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md should be displayed at the bottom

## 🎯 Next Steps

Your code is now on GitHub! Continue to [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment instructions.

## 🔄 Future Updates

After this initial setup, you can push updates with:

```bash
git add .
git commit -m "Your commit message"
git push
```

---

Need help? Check [GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
