/**
 * Tecno Service – Cookie Consent Banner
 * Minimal, GDPR-compliant. No third-party dependencies.
 * Stores preference in localStorage key "cookie_consent" (value: "accepted" | "declined").
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'cookie_consent';
  const BANNER_ID   = 'cookieBanner';

  function hasConsent() {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  function setConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
  }

  function removeBanner() {
    const el = document.getElementById(BANNER_ID);
    if (el) {
      el.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => el.remove(), 400);
    }
  }

  function buildBanner() {
    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consenso cookie');
    banner.className = [
      'fixed bottom-0 left-0 right-0 z-[9999]',
      'bg-gray-900 text-white px-4 py-4 shadow-2xl',
      'flex flex-col sm:flex-row items-start sm:items-center gap-4',
      'transition-all duration-300 ease-out',
    ].join(' ');

    banner.innerHTML = `
      <div class="flex-1 text-sm leading-relaxed text-gray-300">
        🍪 Questo sito utilizza cookie tecnici e, con il tuo consenso, <strong class="text-white">Google Analytics</strong> per misure statistiche anonime.
        Leggi la nostra
        <a href="/privacy.html" class="underline text-blue-400 hover:text-blue-300 transition-colors">Privacy&nbsp;&amp;&nbsp;Cookie&nbsp;Policy</a>.
      </div>
      <div class="flex gap-3 shrink-0">
        <button id="cookieDecline"
          class="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-colors">
          Solo tecnici
        </button>
        <button id="cookieAccept"
          class="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">
          Accetta
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', () => {
      setConsent('accepted');
      removeBanner();
      // Notify analytics.js so GA loads immediately without a page reload
      window.dispatchEvent(new Event('cookieConsentAccepted'));
    });

    document.getElementById('cookieDecline').addEventListener('click', () => {
      setConsent('declined');
      removeBanner();
    });
  }

  function init() {
    if (hasConsent()) return;   // already decided – don't show again
    // Slight delay so the page renders first
    setTimeout(buildBanner, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
