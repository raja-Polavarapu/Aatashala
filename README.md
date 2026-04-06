# Aatashala — React Website

Built with **Vite + React + Motion for React**. Deployed to GitHub Pages at [aatashala.com](https://www.aatashala.com).

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev
```

---

## File Structure

```
aatashala-react/
├── public/               ← Put ALL images here
│   ├── logo.jpg
│   ├── founder-you.jpg
│   ├── founder-vishal.jpg
│   ├── game1.jpg … game4.jpg
│   └── event1.jpg … event6.jpg
├── src/
│   ├── App.jsx           ← All sections + animations (edit content here)
│   ├── main.jsx          ← React entry point
│   └── index.css         ← Global resets + responsive helpers
├── index.html            ← HTML shell + Google Fonts
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml    ← Auto-deploy on push to main
```

---

## How to Deploy

### Option A: Auto-deploy via GitHub Actions (Recommended)
1. Push this entire folder to your GitHub repo (`raja-Polavarapu/Aatashala`)
2. Go to GitHub repo → **Settings** → **Pages**
3. Set **Source** to `GitHub Actions`
4. Any push to `main` will auto-build and deploy 🚀

### Option B: Manual deploy
```bash
npm run build
# Then push the /dist folder to gh-pages branch manually
```

---

## Things to Update in App.jsx

| Line | What to change |
|------|---------------|
| `name: 'Ravi Teja'` | Replace with your real name |
| `'https://formspree.io/f/YOUR_FORMSPREE_ID'` | Replace with your Formspree ID (see below) |
| `photo: '/founder-vishal.jpg'` *(Bhavika section)* | Replace emoji with photo once ready |

---

## Setting Up Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → set email to `aatashala1@gmail.com`
3. Copy the form ID from the endpoint (e.g. `xabc1234`)
4. In `App.jsx`, find `YOUR_FORMSPREE_ID` and replace with your ID

---

## Images

All images go in the **`/public`** folder (not `/src`).  
Reference them in code as `/logo.jpg`, `/game1.jpg`, etc.

Current images needed:
- `logo.jpg`
- `founder-you.jpg`
- `founder-vishal.jpg`
- `game1.jpg`, `game2.jpg`, `game3.jpg`, `game4.jpg`
- `event1.jpg` through `event6.jpg`

---

## Motion Animations Used

| Section | Animation |
|---------|-----------|
| Hero | `AnimatePresence` crossfade slideshow + Ken Burns scale |
| Stats | Animated counters triggered on scroll entry |
| All sections | `whileInView` fade-up reveals with stagger |
| Cards | `whileHover` lift + shadow |
| CTAs | `whileHover` scale + glow · `whileTap` press |
| Hero dots | `animate` width morph on active slide |
| Nav | Slide-in on mount, scrolled state transition |
