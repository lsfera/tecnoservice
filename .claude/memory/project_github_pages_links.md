---
name: project-github-pages-links
description: GitHub Pages subdirectory deployment requires relative links — no leading slash in href/src
metadata: 
  node_type: memory
  type: project
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

All HTML files and partials must use **relative links** (no leading `/`) for `href` and `src` attributes.

**Why:** GitHub Pages serves the site at `/tecnoservice/` subdirectory. Root-relative links like `href="/chi-siamo.html"` resolve to the site root instead of `/tecnoservice/`, causing 404 on all pages except index. Fixed with a global sed pass stripping leading slashes from all HTML files.

**How to apply:** Any time a new HTML file or partial is created, write all internal links as relative (e.g., `href="servizi.html"`, `src="assets/css/style.css"`). Never use `href="/..."` or `src="/..."` for internal resources.

The `components.js` partial loader already handles subdirectory via `partialPath()` — no JS changes needed for new pages.
