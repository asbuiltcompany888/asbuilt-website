/* Instant quote wizard for /quote/
 *
 * ALL PRICES LIVE IN THE "PRICING" BLOCK BELOW. Change a number here and the
 * calculator and the generated quote both pick it up. Nothing else needs editing.
 *
 * Each sq-ft scope is priced as:  base + rate x (sq ft over the threshold)
 * Rates are keyed by building type: res = residential, com = commercial, ind = industrial.
 */
(function () {
  'use strict';

  var PRICING = {
    // Building + garage sq ft are added together for the sq-ft scopes below.
    floorPlan:   { label: 'Floor Plan',             base: 750, threshold: 3000,  rate: { res: 0.30, com: 0.10, ind: 0.05 } },
    // Site plan is priced on LOT sq ft.
    // The rate slides down as the lot gets bigger. Each rate applies only to the
    // part of the lot inside its band (10,000-15,000 at 5 cents, 15,000-20,000 at 4 cents...).
    sitePlan:    { label: 'Site Plan',              base: 750, threshold: 10000, useLot: true,
                   tiers: [ { upTo: 15000, rate: 0.05 }, { upTo: 20000, rate: 0.04 }, { upTo: 25000, rate: 0.03 },
                            { upTo: 30000, rate: 0.02 }, { upTo: Infinity, rate: 0.01 } ] },
    roofPlan:    { label: 'Roof Plan',              perView: 150, unit: 'per story' },
    rcp:         { label: 'Reflected Ceiling Plan', base: 600, threshold: 3000,  rate: { res: 0.15, com: 0.08, ind: 0.05 } },
    electrical:  { label: 'Electrical',             base: { res: 650, com: 650, ind: 500 }, threshold: 3000, rate: { res: 0.10, com: 0.08, ind: 0.05 } },
    mep:         { label: 'M.E.P.',                 base: 750, threshold: 3000,  rate: { res: 0.10, com: 0.15, ind: 0.05 } },
    heights:     { label: 'Window & Door Heights',  base: 200, flat: true },
    video360:    { label: '360 Video',              base: 150, flat: true },
    // Per-view scopes
    extElev:     { label: 'Elevations (exterior)',  perView: 200, unit: 'per elevation view' },
    intElev:     { label: 'Elevations (interior)',  perView: 50,  unit: 'per elevation view' },
    sections:    { label: 'Sections',               perView: 100, unit: 'per section view' },

    garageSqFtPerSpace: 225,    // residential only: each garage parking space adds this many sq ft
    minimumJob: 750,            // every job costs at least this; the quote is the higher of this and the items' total
    bundleDiscount: 100,        // $ off when Floor Plan and Site Plan are ordered together
    depositPercent: 20,        // deposit due before the project starts (Jonathan, 2026-11-22; was "on site")
    instantStates: ['CA'],      // other states get a custom quote instead of an instant price
    maxInstantSqFt: 50000       // larger buildings get a custom quote
  };

  /* Address search + aerial photo provider.
   * Today this uses Esri's public geocoder and World Imagery, which need no key.
   * To switch to Google Maps, a Google Maps Platform key is required (see CLAUDE.md). */
  var GEO = {
    suggest: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
    find: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates',
    imagery: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export',
    // FEMA USA Structures: public, keyless building outlines for the whole country.
    structures: 'https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/USA_Structures_View/FeatureServer/0/query'
  };

  /* Emails the customer a copy of their quote with a link to open and sign it.
   * Uses EmailJS (emailjs.com) connected to the business Gmail. Leave any ID blank to switch this off. */
  var EMAILJS = { publicKey: 'hMbOCVd9AfP8-QQv7', serviceId: 'service_d2kbywg', templateId: 'template_3k6v99g', from: 'hello@asbuiltcompany.com' };

  var ORDER = ['floorPlan', 'sitePlan', 'roofPlan', 'extElev', 'intElev', 'sections', 'rcp', 'electrical', 'mep', 'heights', 'video360'];
  var TYPE_LABEL = { res: 'Residential', com: 'Commercial', ind: 'Industrial' };
  var IMG_W = 640, IMG_H = 400;

  var form = document.getElementById('iq-form');
  if (!form) return;
  var wizard = document.getElementById('iq');
  var out = document.getElementById('iq-result');
  function byId(id) { return document.getElementById(id); }

  /* ---------- small helpers ---------- */
  function money(n) {
    var s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n < 0 ? '-$' : '$') + s;
  }
  function int(n) { return Math.round(n).toLocaleString('en-US'); }
  function num(id) {
    var v = parseFloat(String(form.elements[id].value).replace(/,/g, ''));
    return isFinite(v) && v > 0 ? v : 0;
  }
  function val(id) { return String(form.elements[id].value || '').trim(); }
  function fmtDate(d) { return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  function pick(v, type) { return typeof v === 'object' ? v[type] : v; }
  function fullAddress() { return val('street') + ', ' + val('city') + ', ' + val('state') + ' ' + val('zip'); }

  /* ---------- state list ---------- */
  (function () {
    var sel = form.elements['state'];
    'AL AK AZ AR CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
      .split(' ').forEach(function (s) {
        var o = document.createElement('option');
        o.value = s; o.textContent = s;
        sel.appendChild(o);
      });
  })();

  /* ---------- step navigation ---------- */
  var steps = Array.prototype.slice.call(form.querySelectorAll('.iq-step'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.iq-dots li'));
  var current = 1;
  function show(n, noScroll) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.getAttribute('data-step')) !== n; });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-done', i + 1 < n);
      d.classList.toggle('is-current', i + 1 === n);
    });
    if (n === 3) updateRunningTotal();
    if (!noScroll) wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function stepError(n, msg) {
    var box = steps[n - 1].querySelector('.iq-error');
    box.textContent = msg || '';
    box.hidden = !msg;
    if (msg) box.scrollIntoView({ block: 'center' });
    return !msg;
  }

  /* ---------- step 1: building type ---------- */
  Array.prototype.forEach.call(form.querySelectorAll('.iq-type'), function (btn) {
    btn.addEventListener('click', function () {
      var t = btn.getAttribute('data-type');
      form.elements['btype'].value = t;
      Array.prototype.forEach.call(form.querySelectorAll('.iq-type'), function (b) { b.classList.toggle('is-picked', b === btn); });
      byId('iq-garage-wrap').hidden = t !== 'res';
      byId('iq-type-chip').textContent = TYPE_LABEL[t] + ' property';
      renderLookupLinks();
      if (geo) loadAerial();
      show(2);
    });
  });

  /* ---------- step 2: address search ---------- */
  var addr = byId('iq-address');
  var list = byId('iq-suggest');
  var manual = byId('iq-manual');
  var geo = null;          // { lat, lon } of the chosen address
  var footprint = null;    // { sqft, ring } traced building outline
  var timer = null, seq = 0, active = -1, suggestions = [];

  function closeList() { list.hidden = true; list.textContent = ''; active = -1; addr.setAttribute('aria-expanded', 'false'); }
  function renderList() {
    list.textContent = '';
    suggestions.forEach(function (s, i) {
      var li = el('li', i === active ? 'is-active' : '', s.text);
      li.setAttribute('role', 'option');
      li.addEventListener('mousedown', function (e) { e.preventDefault(); choose(s); });
      list.appendChild(li);
    });
    list.hidden = !suggestions.length;
    addr.setAttribute('aria-expanded', suggestions.length ? 'true' : 'false');
  }
  addr.addEventListener('input', function () {
    clearTimeout(timer);
    var q = addr.value.trim();
    if (q.length < 4) { suggestions = []; closeList(); return; }
    timer = setTimeout(function () {
      var my = ++seq;
      fetch(GEO.suggest + '?f=json&countryCode=USA&category=Address&maxSuggestions=6&text=' + encodeURIComponent(q))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (my !== seq) return;
          suggestions = (j.suggestions || []).filter(function (s) { return !s.isCollection; });
          active = -1;
          renderList();
        })
        .catch(function () { /* typing still works; the manual fields are the fallback */ });
    }, 250);
  });
  addr.addEventListener('keydown', function (e) {
    if (list.hidden) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length;
      renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(suggestions[active < 0 ? 0 : active]);
    } else if (e.key === 'Escape') { closeList(); }
  });
  addr.addEventListener('blur', function () { setTimeout(closeList, 150); });

  function choose(s) {
    if (!s) return;
    closeList();
    addr.value = s.text.replace(/, USA$/, '');
    fetch(GEO.find + '?f=json&maxLocations=1&outFields=StAddr,City,RegionAbbr,Postal&magicKey=' + encodeURIComponent(s.magicKey) + '&SingleLine=' + encodeURIComponent(s.text))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var c = (j.candidates || [])[0];
        if (!c) { openManual(); return; }
        var a = c.attributes || {};
        form.elements['street'].value = a.StAddr || '';
        form.elements['city'].value = a.City || '';
        if (a.RegionAbbr) form.elements['state'].value = a.RegionAbbr;
        form.elements['zip'].value = a.Postal || '';
        geo = { lat: c.location.y, lon: c.location.x };
        zoom = 1;
        if (!a.StAddr || !a.City || !a.Postal) openManual();
        renderLookupLinks();
        loadAerial();
      })
      .catch(openManual);
  }
  function openManual() { manual.hidden = false; byId('iq-manual-toggle').hidden = true; }
  byId('iq-manual-toggle').addEventListener('click', openManual);

  /* ---------- step 2: aerial photo and building outline ---------- */
  var aerial = byId('iq-aerial');
  var aerialImg = byId('iq-aerial-img');
  var aerialSvg = byId('iq-aerial-svg');
  var aerialNote = byId('iq-aerial-note');
  var box = null;
  var zoom = 1;            // aerial zoom-out factor (1 = closest)
  var SVGNS = 'http://www.w3.org/2000/svg';
  var marked = null;       // where the customer moved the dot to mark their building

  function loadAerial(keep) {
    if (!geo) return;
    var widthM = (form.elements['btype'].value === 'res' ? 170 : 360) * zoom;
    var heightM = widthM * IMG_H / IMG_W;
    var dLon = (widthM / 2) / (111320 * Math.cos(geo.lat * Math.PI / 180));
    var dLat = (heightM / 2) / 110540;
    box = { w: geo.lon - dLon, e: geo.lon + dLon, s: geo.lat - dLat, n: geo.lat + dLat };
    aerialImg.src = GEO.imagery + '?f=image&format=jpg&bboxSR=4326&imageSR=4326&size=' + IMG_W + ',' + IMG_H +
      '&bbox=' + [box.w, box.s, box.e, box.n].join(',');
    aerialImg.alt = 'Aerial view of ' + addr.value;
    aerial.hidden = false;
    if (keep === true) { drawOverlay(footprint ? footprint.ring : null); return; }
    footprint = null;
    marked = null;
    drawOverlay(null);
    aerialNote.textContent = 'The dot marks your address. Wrong building? Tap yours to move the dot.';
  }
  function toXY(lon, lat) {
    return [(lon - box.w) / (box.e - box.w) * IMG_W, (box.n - lat) / (box.n - box.s) * IMG_H];
  }
  function drawOverlay(ring) {
    while (aerialSvg.firstChild) aerialSvg.removeChild(aerialSvg.firstChild);
    if (ring) {
      var poly = document.createElementNS(SVGNS, 'polygon');
      poly.setAttribute('points', ring.map(function (p) { return toXY(p.lon, p.lat).join(','); }).join(' '));
      poly.setAttribute('class', 'iq-outline');
      aerialSvg.appendChild(poly);
    } else {
      var at = marked || geo;
      var c = toXY(at.lon, at.lat);
      var pin = document.createElementNS(SVGNS, 'circle');
      pin.setAttribute('cx', c[0]); pin.setAttribute('cy', c[1]); pin.setAttribute('r', 9);
      pin.setAttribute('class', 'iq-pin');
      aerialSvg.appendChild(pin);
    }
  }
  // Zoom buttons for large or rural lots. Tapping the photo moves the dot onto the right building;
  // nothing is measured from it (the roof outline estimate was removed, Jonathan 2026-11-24).
  var frame = aerialImg.parentNode;
  var zoomBox = el('div');
  zoomBox.className = 'iq-zoom';
  [['+', 'Zoom in', 0.5], ['−', 'Zoom out', 2]].forEach(function (z) {
    var btn = el('button', null, z[0]);
    btn.type = 'button';
    btn.setAttribute('aria-label', z[1]);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      zoom = Math.min(8, Math.max(0.5, zoom * z[2]));
      loadAerial(true);
    });
    zoomBox.appendChild(btn);
  });
  frame.appendChild(zoomBox);
  frame.addEventListener('click', function (e) {
    if (!box || !geo) return;
    var r = frame.getBoundingClientRect();
    var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    marked = { lon: box.w + fx * (box.e - box.w), lat: box.n - fy * (box.n - box.s) };
    drawOverlay(null);
    aerialNote.textContent = 'Got it. The dot now marks your building.';
  });

  /* ---------- step 2: "I don't know the square footage" ---------- */
  var help = byId('iq-sqft-help');
  byId('iq-sqft-unknown').addEventListener('click', function () {
    help.hidden = !help.hidden;
    if (!help.hidden) renderLookupLinks();
  });
  function renderLookupLinks() {
    var ul = byId('iq-lookup');
    ul.textContent = '';
    var ok = val('street') && val('city');
    byId('iq-lookup-wrap').hidden = !ok;
    byId('iq-lookup-empty').hidden = !!ok;
    if (!ok) return;
    var a = fullAddress(), t = form.elements['btype'].value;
    var g = function (site) { return 'https://www.google.com/search?q=' + encodeURIComponent(val('street') + ' ' + val('city') + ' ' + val('state') + ' ' + val('zip') + ' ' + site); };
    var links = t === 'res'
      ? [['Zillow', 'https://www.zillow.com/homes/' + encodeURIComponent(a.replace(/[,#]/g, '').replace(/\s+/g, '-')) + '_rb/'],
         ['Redfin', g('site:redfin.com')],
         ['Realtor.com', g('site:realtor.com')]]
      : [['LoopNet', g('site:loopnet.com')],
         ['Crexi', g('site:crexi.com')],
         ['PropertyShark', g('site:propertyshark.com')]];
    links.unshift(['Google search', 'https://www.google.com/search?q=' + encodeURIComponent(a + ' sq. ft. estimate')]);
    links.push(['County assessor record', g('county assessor parcel building square feet lot size')]);
    links.forEach(function (l) {
      var li = el('li');
      var link = el('a', null, l[0]);
      link.href = l[1]; link.target = '_blank'; link.rel = 'noopener';
      li.appendChild(link);
      ul.appendChild(li);
    });
  }
  ['street', 'city', 'state', 'zip'].forEach(function (n) { form.elements[n].addEventListener('change', renderLookupLinks); });

  /* ---------- step 3: scopes and running total ---------- */
  ['roofPlan', 'extElev', 'intElev', 'sections'].forEach(function (k) {
    var cb = form.elements['scope_' + k];
    var wrap = byId('iq-count-' + k);
    function sync() { wrap.hidden = !cb.checked; }
    cb.addEventListener('change', sync);
    sync();
  });
  (function () {
    var cb = form.elements['scope_sitePlan'];
    var lot = byId('iq-lot-wrap');
    function sync() { lot.hidden = !cb.checked; }
    cb.addEventListener('change', sync);
    sync();
  })();
  steps[2].addEventListener('input', updateRunningTotal);
  steps[2].addEventListener('change', updateRunningTotal);
  function updateRunningTotal() {
    var d = collect(), bar = byId('iq-running'), numEl = byId('iq-running-num'), note = byId('iq-running-note');
    var n = Object.keys(d.scopes).length;
    if (customReason(d)) {
      numEl.textContent = 'Custom quote';
      note.textContent = 'We’ll price this one by hand and email it to you.';
    } else {
      var q = price(d);
      numEl.textContent = money(q.total);
      note.textContent = n ? n + (n === 1 ? ' item' : ' items') + (q.discount ? ' · ' + money(q.discount) + ' bundle discount applied' : '') + (q.minAdd ? ' · ' + money(PRICING.minimumJob) + ' job minimum applies' : '') : 'Pick what you need drawn.';
    }
    bar.classList.remove('is-bump');
    void bar.offsetWidth;
    bar.classList.add('is-bump');
  }

  /* ---------- next / back buttons ---------- */
  Array.prototype.forEach.call(form.querySelectorAll('[data-back]'), function (b) {
    b.addEventListener('click', function () { show(current - 1); });
  });
  Array.prototype.forEach.call(form.querySelectorAll('[data-next]'), function (b) {
    b.addEventListener('click', function () {
      var d = collect(), msg = '';
      if (current === 2) {
        if (!d.street && addr.value.trim()) { openManual(); msg = 'Please pick your address from the list, or fill in the address fields.'; }
        else if (!d.street || !d.city || !d.state || !d.zip) { openManual(); msg = 'Please enter the full project address.'; }
        else if (!d.building) msg = 'Please enter the building square footage. An estimate is fine.';
      } else if (current === 3) {
        if (!Object.keys(d.scopes).length) msg = 'Please choose at least one drawing or service.';
        else if (d.scopes.sitePlan && !d.lot) msg = 'Please enter the lot square footage for the site plan. An estimate is fine.';
      }
      if (stepError(current, msg)) show(current + 1);
    });
  });

  /* ---------- pricing ---------- */
  function collect() {
    var d = {
      name: val('name'), company: val('company'), email: val('email'), phone: val('phone'),
      street: val('street'), city: val('city'), state: val('state'), zip: val('zip'),
      type: val('btype'), building: num('building'), spaces: val('btype') === 'res' ? Math.round(num('garage')) : 0, lot: num('lot'),
      multi: form.elements['multi'].checked, notes: val('notes'), scopes: {}
    };
    d.garage = d.spaces * PRICING.garageSqFtPerSpace;
    // Where the dot is (moved by the customer, or still on the address). Rides in the signing link too,
    // so the "quote accepted" email can show the same building photo.
    var at = marked || geo;
    if (at) { d.spot = { lat: +at.lat.toFixed(6), lon: +at.lon.toFixed(6) }; d.marked = !!marked; }
    ORDER.forEach(function (k) {
      if (form.elements['scope_' + k].checked) {
        d.scopes[k] = PRICING[k].perView ? Math.max(1, Math.round(num('count_' + k)) || 1) : true;
      }
    });
    return d;
  }

  function customReason(d) {
    if (PRICING.instantStates.indexOf(d.state) === -1) return 'projects outside California include travel, which we price per job';
    if (d.multi) return 'sites with more than one building are priced per building';
    if (d.building + d.garage > PRICING.maxInstantSqFt) return 'buildings over ' + int(PRICING.maxInstantSqFt) + ' sq. ft. are priced per job';
    return '';
  }

  // Everything is delivered within 3 days, except that elevations (exterior,
  // interior or both) add 5 business days once.
  function deliveryText(d) {
    return d.scopes.extElev || d.scopes.intElev ? '< 8 business days' : '< 3 days';
  }

  function price(d) {
    var sqft = d.building + d.garage;
    var rows = [];
    ORDER.forEach(function (k) {
      if (!d.scopes[k]) return;
      var p = PRICING[k];
      if (p.perView) {
        var n = d.scopes[k];
        rows.push({ desc: p.label, base: money(p.perView), rate: p.unit, qty: String(n), extra: '', amount: p.perView * n });
      } else if (p.flat) {
        rows.push({ desc: p.label, base: money(p.base), rate: 'Flat rate', qty: '', extra: '', amount: p.base });
      } else {
        var area = p.useLot ? d.lot : sqft;
        var base = pick(p.base, d.type);
        var extra = Math.max(0, area - p.threshold);
        var add = 0, rateText;
        if (p.tiers) {
          var from = p.threshold;
          p.tiers.forEach(function (t) {
            if (area > from) add += (Math.min(area, t.upTo) - from) * t.rate;
            from = t.upTo;
          });
          rateText = '$' + p.tiers[0].rate.toFixed(2) + ' to $' + p.tiers[p.tiers.length - 1].rate.toFixed(2) +
            ' sliding, after ' + int(p.threshold) + ' sq. ft.';
        } else {
          var rate = pick(p.rate, d.type);
          add = extra * rate;
          rateText = '$' + rate.toFixed(2) + ' after ' + int(p.threshold) + ' sq. ft.';
        }
        rows.push({
          desc: p.label, base: money(base),
          rate: rateText,
          qty: int(area), extra: int(extra),
          amount: Math.round((base + add) * 100) / 100
        });
      }
    });
    var subtotal = rows.reduce(function (s, r) { return s + r.amount; }, 0);
    var discount = d.scopes.floorPlan && d.scopes.sitePlan ? PRICING.bundleDiscount : 0;
    var total = Math.round((subtotal - discount) * 100) / 100;
    var minAdd = rows.length && total < PRICING.minimumJob ? Math.round((PRICING.minimumJob - total) * 100) / 100 : 0;
    total += minAdd;
    return {
      rows: rows, subtotal: subtotal, discount: discount, minAdd: minAdd, total: total,
      deposit: Math.round(total * PRICING.depositPercent) / 100,
      // Electrical adds at least an hour on site (Jonathan, 2026-11-22).
      measure: d.scopes.electrical
        ? (sqft < 10000 ? 'About 2 hours' : sqft < 100000 ? 'About 4 hours' : '< 1 day')
        : (sqft < 10000 ? '< 1 hour' : sqft < 100000 ? 'About 3 hours' : '< 1 day'),
      delivery: deliveryText(d, sqft)
    };
  }

  /* Quote number (Jonathan, 2026-11-24): first letter of the building type, the street number,
     the suite or unit number if there is one, the first letter of each word of the street name
     (the ending such as St or Ave is left out), the first letter of each word of the city, then the state.
     Residential at 1361 La Mirada St, Laguna Beach, CA is R1361LMLBCA. */
  var STREET_ENDINGS = /^(st|street|ave|av|avenue|blvd|boulevard|dr|drive|rd|road|ln|lane|ct|court|pl|place|way|cir|circle|ter|terrace|pkwy|parkway|hwy|highway|trl|trail|sq|square|loop|aly|alley|plz|plaza|cres|crescent|row|run|path|pass|walk)$/i;
  function initials(words) {
    return words.map(function (w) { return (/[a-z0-9]/i.exec(w) || [''])[0]; }).join('');
  }
  function quoteNumber(d) {
    var street = String(d.street || '').trim();
    var unit = '';
    var m = /(?:#|\b(?:suite|ste|unit|apt|apartment|bldg|building|rm|room|no)\b\.?)\s*#?\s*([a-z0-9][a-z0-9-]*)\s*$/i.exec(street);
    if (m) { unit = m[1].replace(/[^a-z0-9]/gi, ''); street = street.slice(0, m.index).replace(/[\s,]+$/, ''); }
    var num = (/^\s*(\d+)/.exec(street) || [])[1] || '';
    var words = street.replace(/^\s*\d+[a-z]?\b[\s-]*/i, '').split(/[\s,]+/).filter(Boolean);
    if (words.length > 1 && STREET_ENDINGS.test(words[words.length - 1].replace(/\.$/, ''))) words.pop();
    var city = String(d.city || '').split(/[\s,-]+/).filter(Boolean);
    return ((TYPE_LABEL[d.type] || '').charAt(0) + num + unit + initials(words) + initials(city) + String(d.state || '')).toUpperCase();
  }

  /* ---------- the quote sheet ---------- */
  function kv(parent, label, value) {
    var r = el('div', 'iq-kv');
    r.appendChild(el('span', 'iq-k', label));
    r.appendChild(el('span', 'iq-v', value));
    parent.appendChild(r);
  }

  function renderQuote(d, q, when) {
    var now = when ? new Date(when) : new Date();
    var sheet = el('div', 'iq-sheet');
    sheet.id = 'iq-sheet';
    if (q.rows.length > 4) sheet.className += ' iq-dense';

    // Same layout as the invoice and receipt: company name top left, red document word top right.
    var top = el('div', 'iq-top');
    var brand = el('div', 'iq-brand');
    brand.appendChild(el('div', 'iq-brand-top', 'AS-BUILT'));
    brand.appendChild(el('div', 'iq-brand-bottom', 'COMPANY'));
    top.appendChild(brand);
    var word = el('div', 'iq-wordwrap');
    word.appendChild(el('div', 'iq-word', 'QUOTE'));
    word.appendChild(el('div', 'iq-num', '#' + quoteNumber(d)));
    top.appendChild(word);
    sheet.appendChild(top);
    var dates = el('div', 'iq-dates');
    kv(dates, 'Date', fmtDate(now));
    sheet.appendChild(dates);

    var parties = el('div', 'iq-parties');
    var from = el('div', 'iq-from');
    from.appendChild(el('div', 'iq-label', 'Quote from'));
    from.appendChild(el('div', 'iq-name', 'As-Built Company'));
    ['Jonathan Chen', 'Lead As-Built Surveyor', '(626) 625-9247', 'jonathan@asbuiltcompany.com', 'www.asbuiltcompany.com']
      .forEach(function (t) { from.appendChild(el('div', null, t)); });
    kv(from, 'Building', TYPE_LABEL[d.type]);
    var to = el('div', 'iq-to');
    to.appendChild(el('div', 'iq-label', 'Quote to'));
    to.appendChild(el('div', 'iq-name', d.name));
    if (d.company) to.appendChild(el('div', null, d.company));
    to.appendChild(el('div', null, d.email));
    if (d.phone) to.appendChild(el('div', null, d.phone));
    to.appendChild(el('div', 'iq-name iq-h-gap', "Project's Address"));
    to.appendChild(el('div', null, d.street + ','));
    to.appendChild(el('div', null, d.city + ', ' + d.state + ' ' + d.zip));
    var facts = el('div', 'iq-facts');
    kv(facts, 'Lot Sq. Ft.', int(d.lot) + ' sq.ft.');
    kv(facts, 'Building Sq. Ft.', int(d.building) + ' sq.ft.');
    kv(facts, 'Garage Sq. Ft.', int(d.garage) + ' sq.ft.' + (d.spaces ? ' (' + d.spaces + (d.spaces === 1 ? ' space)' : ' spaces)') : ''));
    to.appendChild(facts);
    parties.appendChild(from);
    parties.appendChild(to);
    sheet.appendChild(parties);

    var wrap = el('div', 'iq-table-wrap');
    var table = el('table', 'iq-table');
    var thead = el('thead');
    var hr = el('tr');
    ['DESCRIPTION', 'BASE PRICE', '$/ S.F.', 'SQ. FT.', 'Extra', 'AMOUNT'].forEach(function (h) { hr.appendChild(el('th', null, h)); });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tb = el('tbody');
    q.rows.forEach(function (r) {
      var tr = el('tr');
      [r.desc, r.base, r.rate, r.qty, r.extra, money(r.amount)].forEach(function (c) { tr.appendChild(el('td', null, c)); });
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    wrap.appendChild(table);
    sheet.appendChild(wrap);
    // Blank ruled rows so the table fills the page like the paper quote form.
    var fill = el('div', 'iq-fill');
    for (var blank = Math.max(2, 7 - q.rows.length); blank > 0; blank--) fill.appendChild(el('div', 'iq-fill-row'));
    sheet.appendChild(fill);

    var bottom = el('div', 'iq-bottom');
    var est = el('div', 'iq-est');
    var big = el('div', 'iq-big');
    big.appendChild(el('div', 'iq-h', 'QUOTE TOTAL'));
    big.appendChild(el('div', 'iq-big-num', money(q.total)));
    est.appendChild(big);
    kv(est, 'Estimated time to measure:', q.measure);
    kv(est, 'Estimated time to delivery:', q.delivery);
    bottom.appendChild(est);
    var totals = el('div', 'iq-totals');
    kv(totals, 'SUBTOTAL', money(q.subtotal));
    if (q.discount) kv(totals, 'DISCOUNT', money(-q.discount));
    if (q.minAdd) kv(totals, 'JOB MINIMUM', '+' + money(q.minAdd));
    kv(totals, 'TOTAL', money(q.total));
    kv(totals, PRICING.depositPercent + '% DEPOSIT', money(q.deposit));
    totals.lastChild.className += ' iq-deposit';
    totals.appendChild(el('div', 'iq-due', 'DUE BEFORE THE PROJECT STARTS'));
    bottom.appendChild(totals);
    sheet.appendChild(bottom);

    var terms = el('div', 'iq-terms');
    if (q.discount) terms.appendChild(el('p', null, 'Discount applied for ordering a floor plan and site plan together.'));
    if (q.minAdd) terms.appendChild(el('p', null, 'Every job has a ' + money(PRICING.minimumJob) + ' minimum, which has been applied to this quote.'));
    terms.appendChild(el('p', 'iq-final', 'Final price would be calculated through the completed as-built drawings total sq. ft.'));
    terms.appendChild(el('p', null, 'The deposit is due now, before the project starts. Payment instructions are sent as soon as you accept this quote.'));
    terms.appendChild(el('p', null, 'If you accept this quote, please sign below and send this form to jonathan@asbuiltcompany.com'));
    sheet.appendChild(terms);

    // Signature: a box the customer signs on screen with a finger or mouse. It prints with the sheet.
    var sign = el('div', 'iq-sign');
    var sigCol = el('div', 'iq-sigcol');
    var sigWrap = el('div', 'iq-sigwrap');
    var pad = el('canvas', 'iq-sigpad');
    pad.setAttribute('aria-label', 'Signature box: sign here with your finger or mouse');
    sigWrap.appendChild(pad);
    var hint = el('div', 'iq-sighint', 'Sign here with your finger or mouse');
    sigWrap.appendChild(hint);
    sigCol.appendChild(sigWrap);
    sigCol.appendChild(el('div', 'iq-line', 'Signature of Authorized Person'));
    var dateCol = el('div', 'iq-sigcol');
    var dateVal = el('div', 'iq-dateval', '');
    dateCol.appendChild(dateVal);
    dateCol.appendChild(el('div', 'iq-line iq-line-short', 'Date'));
    sign.appendChild(sigCol);
    sign.appendChild(dateCol);
    sheet.appendChild(sign);
    sheet.appendChild(el('p', 'iq-thanks', d.name + ', we thank you so much for considering us for your as-built needs!'));

    var ctx = null, drawing = false, signed = false, locked = false;
    function setup() {
      if (ctx) return;
      var r = pad.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      pad.width = Math.max(1, Math.round(r.width * dpr));
      pad.height = Math.max(1, Math.round(r.height * dpr));
      ctx = pad.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0A1F3D';
    }
    function at(e) { var r = pad.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    pad.addEventListener('pointerdown', function (e) {
      if (locked) return;
      e.preventDefault(); setup();
      drawing = true;
      try { pad.setPointerCapture(e.pointerId); } catch (err) {}
      var p = at(e);
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 0.1, p[1] + 0.1); ctx.stroke();
      if (!signed) { signed = true; hint.hidden = true; dateVal.textContent = fmtDate(new Date()); sheet.className += ' iq-signed'; }
    });
    pad.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      e.preventDefault();
      var p = at(e); ctx.lineTo(p[0], p[1]); ctx.stroke();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { pad.addEventListener(n, function () { drawing = false; }); });
    sheet.iqSign = {
      isSigned: function () { return signed; },
      lock: function () { locked = true; sheet.className += ' iq-sign-locked'; },
      clear: function () {
        if (locked) return;
        if (ctx) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, pad.width, pad.height); ctx.restore(); }
        signed = false; hint.hidden = false; dateVal.textContent = '';
        sheet.className = sheet.className.replace(' iq-signed', '');
      }
    };
    return sheet;
  }

  /* ---------- email a copy to the team ---------- */
  // A link to /building/ (public/building/index.html): the same aerial photo the customer saw,
  // centred on their building with the red dot on it. The location rides after "#".
  function buildingPhoto(d) {
    return location.origin + '/building/#' + d.spot.lat + ',' + d.spot.lon + ',' +
      (d.type === 'res' ? 170 : 360) + ',' + (d.marked ? 'm' : 'a');
  }
  function summaryText(d, q, reason) {
    var L = [];
    L.push('Quote number: #' + quoteNumber(d));
    L.push('Project: ' + d.street + ', ' + d.city + ', ' + d.state + ' ' + d.zip);
    L.push('Building type: ' + TYPE_LABEL[d.type]);
    L.push('Building ' + int(d.building) + ' sq ft, garage ' + int(d.garage) + ' sq ft (' + d.spaces + ' spaces), lot ' + int(d.lot) + ' sq ft');
    if (d.spot) {
      L.push('');
      L.push(d.marked ? 'The customer tapped the photo to mark their building (red dot):'
                      : 'The customer left the dot on the address (red dot):');
      L.push('Photo: ' + buildingPhoto(d));
      L.push('Google Maps: https://www.google.com/maps?q=' + d.spot.lat + ',' + d.spot.lon);
    }
    if (d.multi) L.push('More than one building on site: yes');
    L.push('');
    if (q) {
      q.rows.forEach(function (r) {
        L.push(r.desc + ': ' + money(r.amount) + '  (' + r.base + ', ' + r.rate + (r.qty ? ', qty ' + r.qty : '') + ')');
      });
      L.push('Subtotal: ' + money(q.subtotal));
      if (q.discount) L.push('Discount: ' + money(-q.discount));
      if (q.minAdd) L.push('Job minimum adjustment: +' + money(q.minAdd));
      L.push('TOTAL QUOTED ON SITE: ' + money(q.total) + '  (deposit ' + money(q.deposit) + ', due before the project starts)');
    } else {
      L.push('NO INSTANT PRICE SHOWN. Reason: ' + reason + '.');
      L.push('Requested: ' + Object.keys(d.scopes).map(function (k) {
        return PRICING[k].label + (PRICING[k].perView ? ' x' + d.scopes[k] : '');
      }).join(', '));
    }
    if (d.notes) { L.push(''); L.push('Notes: ' + d.notes); }
    if (q) {
      L.push('');
      L.push('Job code (paste this whole email into the job ledger to add the quote):');
      L.push(jobCode(d, q));
    }
    return L.join('\n');
  }

  /* The quote packed into one line of text, so the private job ledger can read it back
     from a pasted email. The ledger looks for "ABQ1:" ... ":END" and ignores line breaks. */
  function jobCode(d, q) {
    var o = {
      v: 1, d: new Date().toISOString().slice(0, 10),
      n: d.name, e: d.email, p: d.phone, c: d.company,
      st: d.street, ci: d.city, s: d.state, z: d.zip, tl: TYPE_LABEL[d.type],
      lot: d.lot, b: d.building, g: d.garage,
      r: q.rows.map(function (r) { return [r.desc, r.base, r.rate, r.qty, r.extra, r.amount]; }),
      disc: q.discount || 0, min: q.minAdd || 0, tot: q.total
    };
    var b64;
    try { b64 = btoa(unescape(encodeURIComponent(JSON.stringify(o)))); } catch (e) { return ''; }
    b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return 'ABQ1:' + (b64.match(/.{1,64}/g) || []).join('\n') + ':END';
  }

  /* The whole quote packed into a link, so the customer can reopen it later and sign it.
     It rides in the part of the address after "#", which browsers never send to a server. */
  function packQuote(d, q) {
    var dd = {};
    Object.keys(d).forEach(function (k) { if (k !== 'notes') dd[k] = d[k]; });
    var o = { v: 1, t: Date.now(), d: dd, q: { rows: q.rows, subtotal: q.subtotal, discount: q.discount, minAdd: q.minAdd,
      total: q.total, deposit: q.deposit, measure: q.measure, delivery: q.delivery } };
    try {
      return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) { return ''; }
  }
  function unpackQuote(code) {
    try {
      var b = code.replace(/-/g, '+').replace(/_/g, '/');
      while (b.length % 4) b += '=';
      var o = JSON.parse(decodeURIComponent(escape(atob(b))));
      return o && o.v === 1 && o.t && o.d && o.d.name && o.q && o.q.rows && o.q.rows.length ? o : null;
    } catch (e) { return null; }
  }
  function quoteLink(d, q) {
    var c = packQuote(d, q);
    return c ? location.origin + '/quote/#q=' + c : '';
  }

  /* Email the customer their quote and the link to sign it. Resolves true only when it was sent. */
  function emailCustomer(d, q, link) {
    if (!EMAILJS.publicKey || !EMAILJS.serviceId || !EMAILJS.templateId || !link) return Promise.resolve(false);
    // Only the live site sends real email; local test copies never do.
    if (!/(^|\.)asbuiltcompany\.com$/.test(location.hostname)) return Promise.resolve(false);
    if (form.elements['botcheck'].checked) return Promise.resolve(false);
    var lines = q.rows.map(function (r) { return r.desc + ': ' + money(r.amount); });
    if (q.discount) lines.push('Discount: ' + money(-q.discount));
    if (q.minAdd) lines.push('Job minimum adjustment: +' + money(q.minAdd));
    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId, template_id: EMAILJS.templateId, user_id: EMAILJS.publicKey,
        template_params: {
          to_email: d.email, to_name: d.name, from_email: EMAILJS.from, reply_to: EMAILJS.from,
          address: d.street + ', ' + d.city + ', ' + d.state + ' ' + d.zip,
          items: lines.join('\n'), total: money(q.total), deposit: money(q.deposit),
          measure: q.measure, delivery: q.delivery,
          quote_date: fmtDate(new Date()),
          quote_number: '#' + quoteNumber(d),
          quote_link: link
        }
      })
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  /* signedAt: set when the customer has signed the quote on screen and is sending their acceptance. */
  function send(d, q, reason, signedAt, link) {
    var key = val('access_key');
    if (!key) return Promise.resolve(false);
    if (form.elements['botcheck'].checked) return Promise.resolve(false);
    var subject = (q ? 'Instant quote ' + money(q.total) : 'Custom quote request') + ' - ' + d.street + ', ' + d.city;
    var message = summaryText(d, q, reason);
    if (link) message += '\n\nCustomer link to open and sign this quote:\n' + link;
    if (signedAt) {
      subject = 'QUOTE ACCEPTED AND SIGNED ' + money(q.total) + ' - ' + d.street + ', ' + d.city;
      message = 'QUOTE ACCEPTED. ' + d.name + ' signed this quote on screen on ' + signedAt + '.\n' +
        'The drawn signature is on the customer\'s copy of the quote; it cannot be attached to this email.\n\n' + message;
    }
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: subject,
        from_name: 'As-Built Company Website',
        name: d.name, email: d.email, phone: d.phone, company: d.company,
        message: message
      })
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  /* ---------- final step: show the quote ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (current !== 4) return;
    var d = collect(), msg = '';
    if (!d.name || !d.email) msg = 'Please enter your name and email so we know who the quote is for.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) msg = 'Please enter a valid email address.';
    if (!stepError(4, msg)) return;

    var reason = customReason(d);
    var q = reason ? null : price(d);
    var link = q ? quoteLink(d, q) : '';
    var status = present(d, q, reason);
    send(d, q, reason, null, link).then(function (ok) {
      status.textContent = ok
        ? 'A copy of this request has been sent to our team. We’ll follow up to schedule your site visit.'
        : 'We couldn’t send your request automatically. Please email this quote to hello@asbuiltcompany.com or call (626) 625-9247.';
      if (!q) return;
      emailCustomer(d, q, link).then(function (sent) {
        if (sent) status.textContent += ' We also emailed this quote to ' + d.email + ' with a link to sign it later.';
      });
    });
  });

  /* Draw the result screen. `when` is set when a quote is reopened from its emailed link. */
  function present(d, q, reason, when) {
    out.textContent = '';

    var bar = el('div', 'iq-actions');
    if (q) {
      var print = el('button', 'btn', 'Download / print PDF');
      print.type = 'button';
      print.addEventListener('click', function () { window.print(); });
      bar.appendChild(print);
    }
    var again = el('button', 'btn btn-secondary', when ? 'Start a new quote' : 'Change details');
    again.type = 'button';
    again.addEventListener('click', function () {
      if (when) { history.replaceState(null, '', location.pathname); location.reload(); return; }
      out.hidden = true; wizard.hidden = false; show(3);
    });
    bar.appendChild(again);

    if (q) {
      out.appendChild(el('h2', 'iq-result-title', 'Your quote'));
      out.appendChild(bar);
      var sheetEl = renderQuote(d, q, when);
      out.appendChild(sheetEl);
      // Accept the quote: sign in the box on the sheet, then send.
      var accept = el('div', 'iq-accept iq-no-print');
      accept.appendChild(el('div', 'iq-accept-title', 'Ready to go ahead?'));
      accept.appendChild(el('p', null, 'Sign in the box on the quote with your finger or mouse, then send it to us. You can still print or save a signed copy for yourself.'));
      var abar = el('div', 'iq-actions');
      var sendBtn = el('button', 'btn', 'Send signed quote');
      sendBtn.type = 'button';
      var clearBtn = el('button', 'btn btn-secondary', 'Clear signature');
      clearBtn.type = 'button';
      abar.appendChild(sendBtn);
      abar.appendChild(clearBtn);
      accept.appendChild(abar);
      var astatus = el('p', 'iq-accept-status', '');
      astatus.setAttribute('role', 'status');
      accept.appendChild(astatus);
      out.appendChild(accept);
      clearBtn.addEventListener('click', function () { sheetEl.iqSign.clear(); astatus.textContent = ''; });
      sendBtn.addEventListener('click', function () {
        if (!sheetEl.iqSign.isSigned()) {
          astatus.textContent = 'Please sign in the box on the quote first.';
          sheetEl.querySelector('.iq-sign').scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        sendBtn.disabled = true; clearBtn.disabled = true;
        astatus.textContent = 'Sending your signed quote…';
        send(d, q, null, new Date().toLocaleString('en-US')).then(function (ok) {
          if (ok) {
            sheetEl.iqSign.lock();
            astatus.textContent = 'Thank you, ' + d.name + '. Your signed quote has been sent. We’ll contact you to schedule the site visit. Use “Download / print PDF” to keep your signed copy.';
          } else {
            sendBtn.disabled = false; clearBtn.disabled = false;
            astatus.textContent = 'We couldn’t send it automatically. Please use “Download / print PDF” and email the signed quote to jonathan@asbuiltcompany.com.';
          }
        });
      });
    } else {
      var note = el('div', 'callout');
      note.appendChild(el('div', 'callout-title', 'This one needs a custom quote'));
      note.appendChild(el('p', null, 'Thanks, ' + d.name + '. We can’t price this instantly because ' + reason + '. We’ll email a written quote to ' + d.email + ' within one business day.'));
      out.appendChild(note);
      out.appendChild(bar);
    }
    var status = el('p', 'iq-status', when ? '' : 'Sending a copy to our team…');
    out.appendChild(status);
    wizard.hidden = true;
    out.hidden = false;
    out.scrollIntoView({ behavior: when ? 'auto' : 'smooth', block: 'start' });
    return status;
  }

  show(1, true);

  // Opened from the link in the customer's quote email: show that quote again so it can be signed.
  (function () {
    var m = /^#q=([A-Za-z0-9_-]+)$/.exec(location.hash);
    var saved = m ? unpackQuote(m[1]) : null;
    if (!saved) return;
    present(saved.d, saved.q, '', saved.t);
  })();
})();
