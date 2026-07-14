# Ikafé Loyalty System

Monorepo with `backend/` (Express + Mongoose) and `frontend/` (React + Vite).

Quick local setup

- Backend

```bash
cd backend
npm install
# set MONGO_URI in .env
node server.js
```

- Frontend

```bash
cd frontend
npm install
npm run dev
```

Upload to GitHub

Option A (recommended, using GitHub CLI):

```bash
# from repo root
gh repo create YOUR_GITHUB_USERNAME/ikafe-loyalty-system --public --source=. --remote=origin --push
```

Option B (manual):

```bash
git init
git add .
git commit -m "Initial commit"
# create a repo on github.com (new -> repository)
# then add remote, either HTTPS or SSH
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ikafe-loyalty-system.git
git branch -M main
git push -u origin main
```

If using HTTPS and prompted for credentials, use a Personal Access Token (PAT) with `repo` scopes.

Replace `YOUR_GITHUB_USERNAME` with your account name.
