# Kungnection — Chat App

A modern, TypeScript-first chat application front-end, styled with Tailwind CSS and deployed on Vercel.

> Live demo: [https://kungnection-chat-app.vercel.app/](https://kungnection-chat-app.vercel.app/)  

---

## Quick links

* **Production**: [https://kungnection-chat-app.vercel.app/](https://kungnection-chat-app.vercel.app/) 
* **Repo**: [https://github.com/Seanachan/kungnection-chat-app](https://github.com/Seanachan/kungnection-chat-app)

---

## Features

> The repo currently exposes a TypeScript + Tailwind CSS frontend (languages breakdown on GitHub shows ~72% TypeScript, ~27% CSS). The app is deployed on Vercel. Adjust or expand this list to match implemented screens.

* TypeScript UI with responsive Tailwind CSS styling.
* Deployed on Vercel for fast, global edge delivery. 
* Modular “frontend/” workspace to keep the UI stack isolated for future multi-service expansion. 

**Planned (fill in / trim as your roadmap evolves):**

* Realtime messaging (Socket.IO / WebSocket or hosted backend like Supabase Realtime/Firebase RTDB).
* Auth (email/password, OAuth).
* 1:1 DMs and group rooms.
* Presence/typing indicators and read receipts.
* File/image uploads with content moderation.
* Message search and pinned threads.

---

## Tech stack

* **Language**: TypeScript. 
* **Styling**: Tailwind CSS + PostCSS (config files present). 
* **Hosting**: Vercel (live deployment). 
* **Framework**: React with Next.js (assumption—common for Vercel + TS + Tailwind). If you’re using Vite/CRA instead, update the scripts/sections below.

---

## Screenshots

> Add a few key flows here once you’re ready.

```
/docs/images/
  ├─ home.png
  ├─ sign-in.png
  └─ chat-room.png
```

---

## Architecture (high-level)

```
frontend/                # UI workspace (Next.js or Vite)
  ├─ src/
  │  ├─ app|pages/       # Routing (Next.js) or routes (Vite plugins)
  │  ├─ components/      # Reusable UI
  │  ├─ features/chat/   # Chat screens, hooks, services
  │  ├─ lib/             # API clients, utils
  │  └─ styles/          # Tailwind entrypoints
  ├─ public/             # Static assets
  ├─ tailwind.config.js  # Tailwind configuration
  └─ postcss.config.js   # PostCSS pipeline
```

Configs in repo: `tailwind.config.js`, `postcss.config.js`.

---

## Getting started

### Prerequisites

* Node.js 18+ (recommended)
* pnpm or npm

### Clone

```bash
git clone https://github.com/Seanachan/kungnection-chat-app.git
cd kungnection-chat-app/frontend
```

### Install

```bash
# choose one
pnpm install
# or
npm install
```

### Environment

Create `.env.local` in `frontend/` (examples—keep only what you actually use):

```
# If using Next.js
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
NEXT_PUBLIC_WS_URL=wss://your-backend.example.com/socket
# Auth provider (choose one and delete others)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# or Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Run (dev)

```bash
# Next.js
pnpm dev
# or
npm run dev
```

Local dev should be available at `http://localhost:3000` by default (Next.js).

### Build & start (prod)

```bash
# Next.js
pnpm build && pnpm start
# or
npm run build && npm run start
```

---

## Tailwind setup

This project uses Tailwind + PostCSS; the configuration files are already present:

* `tailwind.config.js` for theme, content scanning, and plugins. 
* `postcss.config.js` for the build pipeline. 

Add the Tailwind directives to your global CSS (if not already):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Deployment

The demo is hosted on Vercel. Typical Next.js deployment steps:

1. Push to `main` or configure a production branch in Vercel.
2. Set environment variables in Vercel Project Settings → Environment Variables.
3. Trigger a deployment; Vercel will build and serve automatically.

Live URL: [https://kungnection-chat-app.vercel.app/](https://kungnection-chat-app.vercel.app/)  

---

## Project scripts (examples)

If you’re on Next.js, add or confirm these in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

If you’re on Vite instead, use:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 3000"
  }
}
```

---

## Roadmap

*  Realtime transport (Socket.IO / native WebSocket / Pusher / Supabase Realtime / Firebase).
*  Authentication + session management.
*  DMs, group rooms, and invites.
*  File/image uploads and CDN delivery.
*  Presence, typing indicators, read receipts.
*  Message search, pins, and reactions.
*  E2E or server-side encryption options.
*  Accessibility pass and i18n.

---

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feat/your-feature`
5. Open a Pull Request.

---

## License

Add your chosen license (MIT recommended for open collaboration). Include the full license text in `LICENSE`.

---

## Acknowledgements

* Tailwind CSS and PostCSS configs are part of the repo. ([GitHub][2])
* Deployed via Vercel (see the repo “About” and live link). ([GitHub][1])

---
