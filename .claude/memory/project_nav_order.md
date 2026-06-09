---
name: project-nav-order
description: Canonical navigation menu order for services dropdown (desktop and mobile)
metadata: 
  node_type: memory
  type: project
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

Services menu order (both desktop dropdown and mobile accordion in `partials/header.html`):

1. Antenne e parabole satellitari → `servizi.html#antennista`
2. Automazione → `servizi.html#automazione`
3. Condizionamento → `servizi.html#condizionamento`
4. Impianti Civili → `servizi.html#impianti-civili`
5. Impianti Industriali → `servizi.html#impianti-industriali`
6. Videosorveglianza → `servizi.html#videosorveglianza`
7. Trasmissione Dati → `servizi.html#trasmissione-dati`
8. Spazzacamino *(orange "New" badge)* → `servizi.html#spazzacamino`
9. Laboratorio Riparazione → `laboratorio.html`
10. [separator]
11. Tutti i servizi → `servizi.html`

**Why:** User explicitly requested Antenne, Automazione, Condizionamento at the top (commit 1a7c82a). These are the three priority services.

**How to apply:** When adding new services to the nav, insert them after Trasmissione Dati (position 8) and before Spazzacamino/Laboratorio, unless user specifies otherwise.
