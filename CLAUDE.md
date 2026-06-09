# Claude Code — Tecno Service Project

## Memory
Workspace memory lives in `.claude/memory/`. Read `MEMORY.md` there at the start of each session.

Key rules derived from memory:
- **No Co-Authored-By in commits** — user explicitly rejected it
- **Relative links only** — no leading `/` in href/src (GitHub Pages subdirectory deployment)
- **Service scope tight** — don't pad service bullet lists with plausible extras the business doesn't offer

## Pending task
Give visual emphasis to **Automazione** — same featured-card treatment as Condizionamento and Antennista on homepage. See `.claude/memory/project_visual_hierarchy.md`.

## Project at a glance
- Static HTML/CSS/JS, Tailwind CDN, no build step
- Partials loaded dynamically via `assets/js/components.js`
- Staging: GitHub Pages at `https://lsfera.github.io/tecnoservice/`
- Production: Aruba FTP deploy via GitHub Actions
- Full details: `.claude/memory/project_tecnoservice.md`
