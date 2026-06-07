/**
 * Tecno Service – Google Analytics 4 (consent-aware)
 *
 * GA viene caricato SOLO se l'utente ha accettato i cookie.
 * Si integra con cookie-banner.js tramite l'evento custom "cookieConsentAccepted".
 *
 * ⚠️  Sostituisci GA_MEASUREMENT_ID con il tuo ID reale (es. G-ABC1234567)
 *     Lo trovi in: GA4 → Amministrazione → Flussi di dati → il tuo sito.
 */
(function () {
  'use strict';

  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- sostituisci qui

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    // Inject the gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Bootstrap the data layer
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,          // extra privacy layer
      cookie_flags: 'SameSite=None;Secure',
    });
  }

  // 1. If the user already accepted in a previous session → load immediately
  if (localStorage.getItem('cookie_consent') === 'accepted') {
    loadGA();
  }

  // 2. If they accept right now via the banner → load on the fly
  window.addEventListener('cookieConsentAccepted', loadGA);
})();
