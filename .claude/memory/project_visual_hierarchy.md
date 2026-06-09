---
name: project-visual-hierarchy
description: Featured services on homepage and their visual treatment
metadata: 
  node_type: memory
  type: project
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

Homepage service grid uses two tiers:
1. **Featured cards** (large, colored background, "Più richiesto" badge, bullet points, hover arrow link)
2. **Standard cards** (white background, smaller)

Current featured services (as of 2026-06-08):
- **Condizionamento** — sky-blue color scheme (`bg-sky-*`)
- **Antenne e parabole satellitari** — dark brand-blue color scheme (`bg-brand-*`)

**Pending:** "Automazione" was requested to receive similar featured treatment ("dai risalto alla parte di automazione") but was not yet implemented — interrupted by the rename/reorder task. This is the next task to complete.

**Why:** User wants the three top commercial services (Antennista, Condizionamento, Automazione) visually prominent to drive leads for the most requested work.

**How to apply:** When implementing Automazione emphasis, add it as a third featured card alongside Condizionamento and Antennista. Likely converting to a 3-column featured layout. Also add a badge/emphasis in `servizi.html#automazione` section. See [[project-tecnoservice]].
