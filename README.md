# APEXFIT

Premium mobile-first gym management app for owners, solo trainers, multi-trainer staff, and students.

## Stack

- Next.js App Router + React
- Firebase-ready Auth, Firestore, Storage, and Cloud Messaging modules
- Mobile-first PWA manifest and service worker
- Role-based demo login and dashboards
- Custom responsive charts, glass UI, neon accents, and realistic demo data

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo Roles

- Owner / Manager: `owner@apexfit.demo`
- Staff Trainer: `trainer@apexfit.demo`
- Solo Trainer: `solo@apexfit.demo`
- Student / Member: `member@apexfit.demo`

All demo passwords are `apexfit-demo`.

## Firebase Setup

Copy `.env.example` to `.env.local` and add your Firebase web app values. With config present, the shared service layer writes members, check-ins, payments, announcements, notifications, and transformation uploads to Firebase. Without config, the app stays fully functional in local demo mode.

## Included Systems

- Owner analytics, member management, trainer management, fee collection, gym plans, workout templates, announcements, retention insights, and super admin panel
- Solo trainer simplified operations dashboard
- Trainer student board with measurements, diet notes, reminders, and transformation photos
- Student PIN check-in, workout completion, leaderboard, progress, trainer message, and membership renewal
- API routes for check-in, daily PIN rotation, and notification queueing
