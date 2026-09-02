# Immanuvel Alex — Portfolio

Personal portfolio site, built with Vite, React, TypeScript, and Three.js (React Three Fiber). Deployed to GitHub Pages.

Live: https://a3lxq.github.io/portfolio-website/

## Stack

- Vite + React + TypeScript
- Tailwind CSS (build-time)
- Three.js / React Three Fiber + drei (3D hero scene)
- GSAP + ScrollTrigger, Lenis (scroll-driven animation)

## Local development

```bash
nvm use --lts   # or: nvm install --lts
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages automatically.

## License

© Immanuvel Alex. Source shared for reference; please don't republish the content (résumé, bio, project descriptions) as your own.
