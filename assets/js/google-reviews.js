(function () {
  var KEY = 'AIzaSyAkIMlJYONvOfZlmHeGgp7sIq-kGlC_RzE';
  var QUERY = 'Tecno Service di Cuppini Manuel Molinella';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function starsSVG(rating) {
    return Array.from({ length: 5 }, function (_, i) {
      var cls = i < rating ? 'text-yellow-400' : 'text-gray-200';
      return '<svg class="w-4 h-4 ' + cls + '" fill="currentColor" viewBox="0 0 20 20">'
        + '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>'
        + '</svg>';
    }).join('');
  }

  function avatar(name, photoUri) {
    if (photoUri) {
      return '<img src="' + esc(photoUri) + '" alt="' + esc(name) + '" '
        + 'class="w-10 h-10 rounded-full object-cover bg-gray-100 shrink-0" loading="lazy">';
    }
    var palette = [
      'bg-brand-100 text-brand-700',
      'bg-sky-100 text-sky-700',
      'bg-emerald-100 text-emerald-700',
      'bg-amber-100 text-amber-700'
    ];
    var cls = palette[name.charCodeAt(0) % palette.length];
    return '<div class="w-10 h-10 rounded-full ' + cls + ' flex items-center justify-center font-bold text-sm shrink-0">'
      + esc(name.charAt(0).toUpperCase()) + '</div>';
  }

  function hideSection() {
    var section = document.getElementById('reviews-section');
    if (section) section.style.display = 'none';
  }

  function renderSummary(rating, total) {
    var el = document.getElementById('reviews-summary');
    if (!el) return;
    el.innerHTML =
      '<div class="flex items-center gap-2">'
      + '<span class="text-2xl font-extrabold text-gray-900">' + rating.toFixed(1) + '</span>'
      + '<div class="flex gap-0.5">' + starsSVG(Math.round(rating)) + '</div>'
      + '<span class="text-gray-500 text-sm">su ' + total + ' recensioni</span>'
      + '</div>';
  }

  function renderCards(reviews, placeId) {
    var writeLink = document.getElementById('reviews-write-link');
    if (writeLink && placeId) {
      writeLink.href = 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(placeId);
    }
    var mapsLink = document.getElementById('reviews-maps-link');
    if (mapsLink && placeId) {
      mapsLink.href = 'https://www.google.com/maps/place/?q=place_id:' + encodeURIComponent(placeId);
    }

    var grid = document.getElementById('reviews-grid');
    if (!grid) return;

    var withText = reviews.filter(function (r) { return r.text && r.text.text; });
    if (!withText.length) {
      grid.innerHTML = '';
      return;
    }

    grid.innerHTML = withText.map(function (r) {
      var name = (r.authorAttribution && r.authorAttribution.displayName) || 'Cliente';
      var photo = (r.authorAttribution && r.authorAttribution.photoUri) || '';
      var ago   = r.relativePublishTimeDescription || '';
      var text  = (r.text && r.text.text) || '';

      return '<div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">'
        + '<div class="flex items-center gap-3">'
        +   avatar(name, photo)
        +   '<div>'
        +     '<p class="font-semibold text-gray-900 text-sm leading-tight">' + esc(name) + '</p>'
        +     '<p class="text-gray-400 text-xs">' + esc(ago) + '</p>'
        +   '</div>'
        + '</div>'
        + '<div class="flex gap-0.5">' + starsSVG(r.rating) + '</div>'
        + '<p class="text-gray-600 text-sm leading-relaxed line-clamp-5">' + esc(text) + '</p>'
        + '</div>';
    }).join('');
  }

  function load() {
    fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'places.id'
      },
      body: JSON.stringify({ textQuery: QUERY })
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var placeId = data.places && data.places[0] && data.places[0].id;
      if (!placeId) { hideSection(); return; }

      return fetch('https://places.googleapis.com/v1/places/' + placeId, {
        headers: {
          'X-Goog-Api-Key': KEY,
          'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
        }
      })
      .then(function (r) { return r.json(); })
      .then(function (details) {
        if (!details.reviews || !details.reviews.length) { hideSection(); return; }
        renderSummary(details.rating || 0, details.userRatingCount || 0);
        renderCards(details.reviews, placeId);
      });
    })
    .catch(hideSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
