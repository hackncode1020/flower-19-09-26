# 💖 Flower give

A romantic, interactive web experience built with React, Vite, TypeScript, and motion-driven animations. The app opens with a glowing "I LOVE YOU" intro, transitions into a blooming flower animation, and lets you personalize the message for someone special.

## ✨ What this app does

- 💗 Shows a full-screen romantic intro with a pulsing heart and glowing text
- 🌸 Transitions into a flower bloom scene with a dedicated message
- ❤️ Creates interactive heart bursts when the user taps or clicks the screen
- 🎵 Includes a subtle ambient audio toggle for a more emotional feel
- 💌 Lets you personalize the recipient name and copy a shareable link
- 🔁 Supports replaying the surprise sequence anytime

## 🧩 Tech stack

- React 19
- Vite
- TypeScript
- Motion animation library
- Lucide icons

## 🚀 Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and run

1. Clone the project
2. Open the project folder
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser:

```text
http://localhost:3000
```

## 💌 Personalization

The app supports a personalized message through the URL parameter:

```text
?to=YourName
```

Example:

```text
http://localhost:3000/?to=Zara
```

You can also click the "Dedicate" button inside the app to set the name and copy a shareable romantic link.

## 🎯 Project structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── types.ts
├── components/
│   ├── FlowerContainer.tsx
│   ├── InteractiveHeartBursts.tsx
│   ├── ParticleCanvas.tsx
│   ├── PersonalizeModal.tsx
│   ├── RomanticAtmosphere.tsx
│   ├── RomanticAudioControl.tsx
│   └── RomanticIntro.tsx
├── utils/
│   └── audio.ts
public/
└── flower/
    ├── index.html
    ├── main.js
    ├── script.js
    └── style.css
```

## 🛠️ Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 🌷 Notes

This project is designed as a romantic surprise experience for a loved one, such as a proposal, anniversary celebration, or heartfelt message. The visuals and interactions are intentionally soft, warm, and cinematic.

If you want, I can also make this README even more premium by adding:

- a screenshot section
- a live demo badge
- project logo styling
- a full "Features / How it works / Deployment" version
- a Hindi or English bilingual version
