# UNI360° — Waitlist Setup Guide

## Prerequisites
- Node.js 18+
- npm or pnpm

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Google Apps Script Setup

1. Create a new Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste the contents of `GOOGLE_APPS_SCRIPT.gs`
4. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL

---

## Environment Variables

Create `.env.local` in the project root:

```env
WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Replace `YOUR_DEPLOYMENT_ID` with your actual Apps Script deployment URL.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

In Vercel dashboard, add the `WEBHOOK_URL` environment variable under **Settings → Environment Variables**.

---

## Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** for animations
- **Sonner** for toast notifications
- **Google Apps Script** for waitlist data collection
