/**
 * Tecno Service – component loader
 * Fetches header and footer partials, injects them, then wires up:
 *  - active nav highlighting
 *  - mobile menu toggle
 *  - services dropdown (desktop)
 *  - services accordion (mobile)
 *  - footer year
 */
(function () {
  'use strict';

  /** Derive the current page key from the filename, e.g. "servizi" from "/servizi.html" */
  function currentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '') || 'index';
    return file === '' ? 'index' : file;
  }

  /** Fetch an HTML partial and return its text */
  async function loadPartial(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.text();
  }

  /** Inject HTML into a placeholder element */
  function inject(placeholderId, html) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    el.outerHTML = html;
  }

  /** Highlight the nav link that matches the current page */
  function setActiveNav(page) {
    // Desktop: plain links
    document.querySelectorAll('.nav-link[data-navpage]').forEach(link => {
      if (link.dataset.navpage === page) {
        link.classList.remove('text-gray-600');
        link.classList.add('text-brand-700', 'border-b-2', 'border-brand-600', 'pb-0.5');
      }
    });
    // Mobile: plain links
    document.querySelectorAll('.nav-link-mobile[data-navpage]').forEach(link => {
      if (link.dataset.navpage === page) {
        link.classList.remove('text-gray-600');
        link.classList.add('text-brand-700', 'font-semibold');
      }
    });
  }

  /** Wire up the mobile hamburger toggle */
  function wireMobileMenu() {
    const btn  = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }
  }

  /** Wire up the desktop services dropdown (click-based) */
  function wireServicesDropdown() {
    const btn      = document.getElementById('servicesBtn');
    const dropdown = document.getElementById('servicesDropdown');
    const chevron  = document.getElementById('servicesChevron');
    if (!btn || !dropdown) return;

    function openDropdown() {
      dropdown.classList.remove('hidden');
      chevron.classList.add('rotate-180');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      dropdown.classList.add('hidden');
      chevron.classList.remove('rotate-180');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.contains('hidden') ? openDropdown() : closeDropdown();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!document.getElementById('servicesMenu')?.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /** Wire up the mobile services accordion */
  function wireServicesAccordion() {
    const btn      = document.getElementById('servicesAccordionBtn');
    const panel    = document.getElementById('servicesAccordion');
    const chevron  = document.getElementById('servicesAccordionChevron');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      chevron.classList.toggle('rotate-180', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  /** Set the footer year dynamically */
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /** Resolve a partial path relative to the site root */
  function partialPath(name) {
    const base = window.location.pathname.replace(/\/[^/]*$/, '/');
    return `${base}partials/${name}.html`;
  }

  async function init() {
    const page = currentPage();

    try {
      const [headerHtml, footerHtml] = await Promise.all([
        loadPartial(partialPath('header')),
        loadPartial(partialPath('footer')),
      ]);

      inject('header-placeholder', headerHtml);
      inject('footer-placeholder', footerHtml);

      setActiveNav(page);
      wireMobileMenu();
      wireServicesDropdown();
      wireServicesAccordion();
      setFooterYear();
    } catch (err) {
      console.error('Component loader error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
