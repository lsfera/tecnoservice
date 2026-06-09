---
name: project-tecnoservice
description: "Core facts about the Tecno Service website project — business, tech stack, deployment"
metadata: 
  node_type: memory
  type: project
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

**Business:** Tecno Service di Cuppini Manuel. Electrical/technical services company, provinces of Bologna and Ferrara, Italy.
- Phone: +39 331 153 3848
- Email: info@tecnoservicecuppini.it
- P.IVA: 04256301203
- **Family tradition since 1981** — founded by Manuel's father, passed to Manuel (2nd generation). This is a key brand differentiator to emphasize in copy.

**Services offered:**
1. Antenne e parabole satellitari (antenna + satellite dish installation)
2. Automazione (gate/shutter automation)
3. Condizionamento (HVAC installation & maintenance)
4. Impianti Civili (residential electrical)
5. Impianti Industriali (industrial electrical)
6. Videosorveglianza (CCTV)
7. Trasmissione Dati (data/networking)
8. Spazzacamino — **only** pulizia canna fumaria (flue cleaning), no attestato, no camera inspection
9. Laboratorio Riparazione — TV repair + appliance repair, Mon–Fri 9–18

**Tech stack:**
- Static HTML/CSS/JS, no build step
- Tailwind CSS via CDN with custom brand color scale (blue = "brand")
- Google Fonts: Inter
- Dynamic partial loading via `fetch()` in `assets/js/components.js`
- `partialPath()` in components.js computes relative partial URLs from `window.location.pathname` — handles subdirectory deployment automatically

**Files:**
- `index.html` — homepage
- `servizi.html` — all services (anchor sections per service)
- `chi-siamo.html` — about/family story
- `contatti.html` — contact form
- `laboratorio.html` — dedicated lab repair page
- `privacy.html` — privacy & cookie policy
- `partials/header.html` — shared nav (loaded dynamically)
- `partials/footer.html` — shared footer (loaded dynamically)
- `assets/js/components.js` — partial loader
- `sitemap.xml`

**Deployment:**
- Production: Aruba FTP via `.github/workflows/ftp-deploy.yml`
- Staging/testing: GitHub Pages at `https://lsfera.github.io/tecnoservice/` via `.github/workflows/pages.yml`
- GitHub Pages deploys entire repo root on push to main

**Why:** GitHub Pages added as free staging environment so changes can be previewed online before pushing to Aruba production.
