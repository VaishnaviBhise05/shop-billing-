# Counter — Shop Billing App

A simple, all-in-one billing app for shop counters. Add items to a cart, generate a bill instantly, print it, and keep track of inventory, customers, dues, and expenses — all from a single HTML file with no installation and no backend server required.

## Features

- **Billing** — search and tap items to add them to a cart, see the live total, and generate a printable bill in one click.
- **Inventory** — add items with price, GST %, HSN code, and stock quantity. Stock reduces automatically as bills are generated.
- **GST invoices** — bills show a proper CGST + SGST split (toggle on/off in Settings).
- **Customers (Khata / Udhaar)** — save customer records and track running balances. Supports full, partial, and credit (pay-later) payments.
- **UPI QR payments** — generate a live UPI QR code for any bill or due amount; customers scan and pay directly to your UPI ID.
- **Expenses** — log shop expenses (rent, purchases, salaries, etc.) by category.
- **Dashboard** — today's revenue, expenses, net total, items sold, top sellers, and low-stock alerts, updating live.
- **History** — every past bill is saved and can be reopened or reprinted anytime.

## Project Structure

This repo is built incrementally, one file at a time. Current structure:

```
shop-billing/
│
├── index.html       # App markup — links style.css, app.js, backup.js, manifest.json
├── style.css         # All styling
├── app.js             # Core app logic (billing, inventory, customers, expenses, dashboard, SW registration)
├── backup.js           # Export/import all data as a .json backup file
├── manifest.json        # Web app manifest — makes the app installable
├── sw.js                # Service worker — offline caching for the app shell
├── icon-192.png          # App icon (192x192)
├── icon-512.png          # App icon (512x512)
├── README.md         # This file
└── CHANGELOG.md       # Day-wise history of what was added and when
```

As new files are added, they'll be listed here and in the Day-wise Log below.

## Day-wise Log

| Day | Date | File Added | What it does |
|-----|------|------------|---------------|
| Day 1 | 2026-08-29 | `index.html` | Complete billing app: cart & billing, inventory, GST invoices, customer khata, UPI QR payments, expenses, dashboard, and history — all in one file. |
| Day 1 | 2026-08-29 | `README.md` | Setup guide, project structure, and this day-wise log. |
| Day 2 | 2026-08-30 | `CHANGELOG.md` | Detailed day-by-day changelog of everything added to the project. |
| Day 3 | 2026-08-31 | `style.css` | All CSS extracted out of `index.html` into its own file; `index.html` updated to link it. |
| Day 4 | 2026-09-01 | `app.js` | All JavaScript logic extracted out of `index.html` into its own file; `index.html` updated again — now pure markup. |
| Day 5 | 2026-09-02 | `backup.js` | New feature: "Download backup" and "Restore backup" buttons in Settings, to export/import all shop data as a `.json` file. |
| Day 6 | 2026-09-03 | `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` | Makes the app installable on a phone's home screen (PWA) and lets it work offline via a service worker cache. |

_This table will be updated each day as new files are added to the project._

## Getting Started

No build step, no dependencies to install.

1. Open `index.html` directly in any modern browser (Chrome, Edge, Safari).
2. Or enable **GitHub Pages** for this repo (Settings → Pages → deploy from branch) to access it from a URL on any device.

## First-time Setup

1. Click the settings (gear) icon and fill in your **shop name, address, phone, GSTIN, and UPI ID**.
2. Go to **Inventory** and add your items (name, price, GST %, stock, HSN code).
3. You're ready to start billing from the **Billing** tab.

## Data Storage

All data (inventory, bills, customers, expenses) is saved automatically in the browser's storage — nothing is lost between sessions. No external database or server is used.

## Tech

Single-file app built with plain HTML, CSS, and JavaScript. QR codes are generated client-side using [qrcodejs](https://github.com/davidshimjs/qrcodejs).

## Roadmap

- [ ] Data backup / export (JSON)
- [ ] Shop logo on receipts
- [ ] Installable as a home-screen app (PWA)
- [ ] Changelog of updates

---

Built and maintained incrementally, one feature at a time.
