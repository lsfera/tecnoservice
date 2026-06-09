---
name: project-google-maps
description: Google Maps iframe placeholder — needs real embed URL from business owner
metadata: 
  node_type: memory
  type: project
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

Both `servizi.html#laboratorio` and `laboratorio.html` contain a Google Maps iframe with a placeholder src:
`https://maps.google.com/maps?q=Tecno+Service+di+Cuppini+Manuel&output=embed`

**Why placeholder:** The real embed URL (from Google Maps → Condividi → Incorpora mappa) was not available at time of implementation. The query-based src works as a fallback but may not show the exact pin.

**How to apply:** When the user provides the real Google Maps embed URL (from the "Incorpora mappa" share flow for the business location), replace both placeholder iframes. Remind user of this if they mention the map looking wrong or showing a generic result.
