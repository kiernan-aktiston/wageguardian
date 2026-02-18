# 🛡️ WageGuardian

Track your earnings. Detect wage theft. Know your rights.

A bilingual (English/Spanish) PWA for Arizona's tipped workers to log shifts, scan pay documents, detect wage violations, and identify potential worker misclassification.

## Quick Deploy (10 minutes)

### 1. Push to GitHub

```bash
cd wageguardian
git init
git add -A
git commit -m "Initial WageGuardian PWA"
gh repo create wageguardian --public --push
```

Or create a repo at github.com/new, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/wageguardian.git
git push -u origin main
```

### 2. Deploy to Vercel (free)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New Project"
3. Import your `wageguardian` repo
4. Framework preset: **Vite** (should auto-detect)
5. Click **Deploy**
6. Done. You'll get a URL like `wageguardian-xyz.vercel.app`

### 3. Test on iPhone

1. Open the Vercel URL in Safari on your iPhone
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. The app icon appears on your home screen — opens fullscreen like a native app

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Project Structure

```
wageguardian/
├── public/
│   ├── manifest.json    # PWA config
│   ├── sw.js            # Service worker (offline support)
│   ├── icon.svg         # Favicon
│   ├── icon-192.png     # PWA icon
│   └── icon-512.png     # PWA splash icon
├── src/
│   ├── main.jsx         # Entry point
│   └── App.jsx          # Full app (i18n, onboarding, all features)
├── index.html           # Shell with iOS PWA meta tags
├── vite.config.js
└── package.json
```

## Features

- **Shift Logging** — Manual entry + quick-add
- **Document Scanning** — OCR for tip receipts & pay stubs (simulated; swap for Tesseract.js)
- **Wage Violation Detection** — Weekly minimum wage + base rate checks against AZ law ($15.15/hr min, $12.15 tipped min)
- **Misclassification Screening** — 6-question quiz based on IRS common law factors
- **Earnings Intelligence** — Best day for tips, day-of-week breakdown
- **PDF Export** — Printable wage reports for attorneys
- **Bilingual** — Full English/Spanish support
- **Offline-capable** — Service worker caches the app shell
- **Privacy-first** — All data stays in localStorage on the user's device

## Arizona Wage Law (as configured)

| Parameter | Value |
|-----------|-------|
| Minimum Wage | $15.15/hr |
| Max Tip Credit | $3.00/hr |
| Tipped Minimum | $12.15/hr |
| Compliance Period | Weekly (Sun–Sat) |

## Custom Domain (optional)

In Vercel dashboard → Settings → Domains → Add `app.wageguardian.com` or whatever domain you register.

## Next Steps

- [ ] Replace simulated OCR with Tesseract.js (client-side)
- [ ] Add Supabase backend for attorney referral leads
- [ ] Attorney referral capture form (Stage 7)
- [ ] Earnings intelligence dashboard (Stage 6)
- [ ] QR code landing page for distribution

## License

Copyright © 2026 Aktiston LLC. All rights reserved.
