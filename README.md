# OOP Lab Judge

A web application for the OOP Lab where students enter their academic ID, solve 8 Java programming tasks in the browser, and get auto-graded by running code on the Judge0 API. Completions are recorded automatically in a Google Sheet.

**Live Demo:** *(your Vercel URL here after deployment)*

---

## Features

- 🔐 Student login by academic ID
- 📋 8 Java programming tasks loaded from Google Sheets
- ✏️ In-browser Java code editor with Tab support
- ⚡ Real-time code execution via Judge0 API
- ✅ Automatic pass/fail checking against expected output
- 📊 Completion status written back to Google Sheets
- 📱 Responsive design

---

## Setup Guide

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → create a **blank spreadsheet**
2. Name it something like **"OOP Lab Judge"**
3. Copy the Spreadsheet **ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/  <YOUR_SPREADSHEET_ID>  /edit
   ```

### Step 2 — Set Up Google Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete the default `myFunction` code
3. Create a new file → paste the content of `google-apps-script/Code.gs`
4. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
5. Create another new file → paste `google-apps-script/InitSheets.gs`
6. **Run `initSheets`** once (click Run → Run function → initSheets)
   - Accept permissions when prompted
   - You should see a popup: ✅ Done! Students (267) and Tasks (8) sheets created.
7. **Deploy as Web App:**
   - Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and **copy the Web App URL**

### Step 3 — Configure Environment Variables

Create `.env.local` in the project root (already exists — just fill it in):

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
JUDGE0_RAPIDAPI_KEY=   # optional, leave blank for free public API
```

> ⚠️ **Never commit `.env.local` to Git.** It's already in `.gitignore`.

### Step 4 — Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and test with a student ID from the sheet.

### Step 5 — Deploy to Vercel

1. Push this folder to a **GitHub repository**
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. In **Environment Variables**, add:
   - `APPS_SCRIPT_URL` → your Apps Script Web App URL
   - `JUDGE0_RAPIDAPI_KEY` → (optional)
4. Click **Deploy** 🚀

---

## Project Structure

```
oop-lab-judge/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Student login page
│   ├── globals.css          # Global styles
│   ├── lab/
│   │   ├── page.tsx         # Lab route (Suspense wrapper)
│   │   └── LabPage.tsx      # Lab client component
│   └── api/
│       ├── student/route.ts # GET /api/student?id=...
│       ├── tasks/route.ts   # GET /api/tasks
│       ├── run/route.ts     # POST /api/run  (Judge0 proxy)
│       └── submit/route.ts  # POST /api/submit (mark complete)
├── components/
│   └── TaskCard.tsx         # Task card with editor + result panel
├── lib/
│   ├── judge0.ts            # Judge0 API helper
│   └── sheets.ts            # Google Sheets/Apps Script helper
├── google-apps-script/
│   ├── Code.gs              # Main Apps Script (Web App API)
│   └── InitSheets.gs        # One-time sheet setup script
├── .env.local               # 🔒 Environment variables (not committed)
└── README.md
```

---

## Task Expected Outputs

| # | Task | Test Input | Expected Output |
|---|------|-----------|----------------|
| 1 | Leap Year | `2000` | `Leap year` |
| 2 | Largest of Three | `8 15 3` | `Largest: 15` |
| 3 | Simple ATM | `1234\n2\n300\n3` | `New balance: 700` |
| 4 | Star Triangle | `4` | `*\n**\n***\n****` |
| 5 | Factorial | `5` | `5! = 120` |
| 6 | Prime Check | `17` | `17 is prime` |
| 7 | Reverse & Palindrome | `121` | `Reversed: 121\nPalindrome` |
| 8 | FizzBuzz | `5` | `1\n2\nFizz\n4\nBuzz` |

> These can be updated at any time in the **Tasks sheet** in Google Sheets — no code changes needed!

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Icons | Lucide React |
| Java Runner | Judge0 API (free public) |
| Database | Google Sheets via Apps Script Web App |
| Hosting | Vercel |
