/* ============ Nexora, Project 16 ============ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- data ---------- */
  var SERVICES = [
    {
      code: 'NX-S01', title: 'Warehouse sorting', chips: ['Global', 'Container'],
      body: 'Our warehouse sorting system is designed to streamline operations, ensuring every package is organized efficiently for quick and accurate delivery.',
      img: 'img/svc-warehouse.webp', alt: 'Nexora trailers reversed into warehouse loading docks, seen from above',
      features: [
        ['Global network', 'Worldwide shipping routes'],
        ['Container options', 'All sizes available'],
        ['Customs support', '24/7 customs support']
      ],
      detail: {
        intro: 'Every parcel, pallet and container is scanned, sorted and routed the moment it reaches the floor, so nothing waits and nothing is lost.',
        rows: [['Sort capacity', '18,000 parcels a day'], ['Scan accuracy', '99.8% first pass'], ['Average dwell time', 'Under 6 hours'], ['Sites', '4 regional hubs']],
        total: 'Sorting is included in every freight plan, priced per pallet or per parcel.'
      }
    },
    {
      code: 'NX-S02', title: 'Sea freight', chips: ['Global', 'Container'],
      body: 'Full and shared container loads on weekly sailings between 38 ports, with door-to-door handling and one tracking reference from booking to arrival.',
      img: 'img/svc-sea.webp', alt: 'A container ship at sea loaded with containers',
      features: [
        ['Port network', '38 ports, weekly sailings'],
        ['Container options', '20 ft, 40 ft and reefer'],
        ['Customs support', '24/7 customs support']
      ],
      detail: {
        intro: 'The mode behind the sample shipment on this page: Shanghai to Rotterdam in one tracked movement, with customs pre-cleared before the vessel berths.',
        rows: [['Ports served', '38 across six continents'], ['Sailings', 'Weekly on core routes'], ['Container types', '20 ft, 40 ft, reefer'], ['Transit, Shanghai to Rotterdam', '32 days']],
        total: 'Sea freight is priced per container, quoted fixed before you book.'
      }
    },
    {
      code: 'NX-S03', title: 'Air cargo', chips: ['Express', 'Global'],
      body: 'Airport-to-airport in hours, not weeks: priority uplift, same-day customs and a courier handover at destination for cargo that cannot wait.',
      img: 'img/svc-air.webp', alt: 'A cargo plane being loaded on an airport apron',
      features: [
        ['Global network', '120+ airports served'],
        ['Speed', 'Same-day uplift available'],
        ['Customs support', '24/7 customs support']
      ],
      detail: {
        intro: 'Built for the shipments that miss nothing: production parts, launch stock and documents that carry a deadline with them.',
        rows: [['Airports served', '120+ worldwide'], ['Fastest lane', 'Frankfurt to Chicago, same day'], ['Max piece weight', '2,400 kg per pallet'], ['Cut-off', '4 hours before departure']],
        total: 'Air cargo is priced per kilo with a fixed handling fee, quoted before uplift.'
      }
    },
    {
      code: 'NX-S04', title: 'Road freight', chips: ['Regional', 'Door to door'],
      body: 'A fleet of 140 trucks on scheduled regional routes, full loads and part loads alike, with live position updates at every border and depot.',
      img: 'img/svc-road.webp', alt: 'A blue Nexora truck driving on a highway',
      features: [
        ['Fleet', '140 trucks on the road'],
        ['Coverage', 'Scheduled routes, 26 regions'],
        ['Tracking', 'Live position, every 15 minutes']
      ],
      detail: {
        intro: 'The last mile of most Nexora journeys and the whole journey for regional freight: one truck, one driver, one reference number.',
        rows: [['Fleet size', '140 trucks'], ['Regions covered', '26 scheduled regions'], ['Position updates', 'Every 15 minutes'], ['On-time rate', '98% across the fleet']],
        total: 'Road freight is priced per route and load, confirmed in the quote.'
      }
    }
  ];

  var STATS = {
    clients: {
      code: 'The fleet numbers', title: '1K+ worldwide clients',
      intro: 'The 1,000+ client base splits across the three ways businesses ship with Nexora. The parts below add up to the headline figure.',
      rows: [['Manufacturing and industry', '412 clients'], ['Retail and e-commerce', '356 clients'], ['Technology and healthcare', '264 clients']],
      total: 'Total: 1,032 active clients, shown on the site as 1K+.'
    },
    years: {
      code: 'The fleet numbers', title: '12+ years of experience',
      intro: 'Counted from the first warehouse lease to today, in three chapters.',
      rows: [['2014 to 2017, regional road freight', '4 years'], ['2018 to 2021, warehousing and sea freight added', '4 years'], ['2022 to today, air cargo and live tracking', '4+ years']],
      total: 'Total: 12+ years, and the count still runs.'
    },
    repeat: {
      code: 'The fleet numbers', title: '95% repeat client rate',
      intro: 'Of every 100 clients who shipped with Nexora last year, 95 booked again. Here is where the other 5 went.',
      rows: [['Booked again within 12 months', '95 of 100'], ['Moved freight in-house', '3 of 100'], ['Stopped trading or relocated', '2 of 100']],
      total: 'Total: 95% repeat, measured across the full client base.'
    }
  };

  var INDUSTRIES = [
    {
      n: '01', name: 'Manufacturing', img: 'img/ind-manufacturing.webp', alt: 'Blue robot arms on a factory line',
      text: 'Reliable transportation for production materials and finished goods.',
      chips: ['Raw materials', 'Factory supply', 'Heavy cargo', 'Just in time'], link: 'Start shipment',
      detail: 'Line-side deliveries sequenced to the production plan, heavy cargo handled with the same reference and the same tracking as a single pallet.'
    },
    {
      n: '02', name: 'Technology', img: 'img/ind-technology.webp', alt: 'A circuit board production line',
      text: 'Protected transportation for electronics and high-value equipment.',
      chips: ['Electronics', 'Secure cargo', 'Components', 'Hardware'], link: 'Consult our experts',
      detail: 'Shock logged, sealed and insured transport for electronics, with component deliveries timed to board production runs.'
    },
    {
      n: '03', name: 'Automotive', img: 'img/ind-automotive.webp', alt: 'A car assembly line',
      text: 'Parts and vehicles moved in step with the assembly line.',
      chips: ['Inbound parts', 'Sequenced delivery', 'Finished vehicles'], link: 'Plan a delivery',
      detail: 'Inbound parts arrive in build sequence, and finished vehicles move on covered transporters with the same live tracking.'
    },
    {
      n: '04', name: 'Healthcare', img: 'img/ind-healthcare.webp', alt: 'Staff in protective suits in a cleanroom',
      text: 'Temperature-controlled, documented transport for medicines and medical devices.',
      chips: ['Cold chain', 'Batch tracking', 'Medical devices'], link: 'Talk to a specialist',
      detail: 'Every batch temperature logged from door to door, with the full document trail regulators ask for, ready before they ask.'
    }
  ];

  var SHIPMENTS = {
    'NX-482193-RT': {
      ref: 'NX-482193-RT', container: 'NXRU 557387 4', vessel: 'Nexora Meridian', status: 'At sea', eta: '8 Nov',
      route: [
        ['Shanghai', 'Departed 6 Oct', true],
        ['Singapore', 'Transshipped 12 Oct', true],
        ['Suez Canal', 'Transit 27 Oct', false],
        ['Rotterdam', 'ETA 8 Nov', false]
      ],
      routeProgress: 58,
      steps: [
        ['Booked', '2 Oct', true],
        ['Picked up', '4 Oct', true],
        ['At sea', 'Since 6 Oct', true],
        ['Customs', 'Pre-cleared', false],
        ['Delivered', 'ETA 8 Nov', false]
      ],
      stepsDone: 3
    },
    'NX-917204': {
      ref: 'NX-917204', container: 'Air waybill 157-48219304', vessel: 'Flight NX 204', status: 'In the air', eta: 'Today, 14:38',
      route: [
        ['Frankfurt', 'Departed 06:10', true],
        ['Reykjavik', 'Fuel stop 09:40', true],
        ['Chicago', 'Lands 14:38', false]
      ],
      routeProgress: 64,
      steps: [
        ['Booked', 'Yesterday', true],
        ['Picked up', 'Yesterday', true],
        ['In the air', 'Since 06:10', true],
        ['Customs', 'Filed', false],
        ['Delivered', 'ETA today', false]
      ],
      stepsDone: 3
    },
    'NX-305517': {
      ref: 'NX-305517', container: 'Trailer NX-5517', vessel: 'Truck, route R-9', status: 'On the road', eta: '12 Nov',
      route: [
        ['Hamburg', 'Departed 10 Nov', true],
        ['Hanover', 'Depot 10 Nov', true],
        ['Munich', 'ETA 12 Nov', false]
      ],
      routeProgress: 45,
      steps: [
        ['Booked', '9 Nov', true],
        ['Picked up', '10 Nov', true],
        ['On the road', 'Since 10 Nov', true],
        ['Depot sort', 'Planned 11 Nov', false],
        ['Delivered', 'ETA 12 Nov', false]
      ],
      stepsDone: 3
    }
  };

  /* ---------- preloader ---------- */
  var preloader = $('#preloader');
  function hidePreloader() { if (preloader) preloader.classList.add('done'); }
  window.addEventListener('load', function () { setTimeout(hidePreloader, 500); });
  setTimeout(hidePreloader, 2600);
  if (preloader) preloader.addEventListener('click', hidePreloader);

  /* ---------- reveals ---------- */
  var revealEls = $$('.reveal, .reveal-img, .truck-stage');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('inview'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('inview'); });
  }

  /* ---------- counters ---------- */
  var counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    $$('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reduceMotion) { el.textContent = target; return; }
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1300, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  var aboutSec = $('#about');
  if ('IntersectionObserver' in window && aboutSec) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounters(); io2.disconnect(); } });
    }, { threshold: 0.12 });
    io2.observe(aboutSec);
    window.addEventListener('scroll', function () {
      if (aboutSec.getBoundingClientRect().top < window.innerHeight * 0.75) runCounters();
    }, { passive: true });
  } else { runCounters(); }

  /* ---------- smooth scroll ---------- */
  $$('[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        var target = $(href === '#top' ? 'main' : href);
        if (target) {
          ev.preventDefault();
          closeMenu();
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    });
  });

  /* ---------- mobile menu ---------- */
  var burger = $('#burger'), mobileMenu = $('#mobileMenu');
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  if (burger) burger.addEventListener('click', function () {
    var open = mobileMenu.hidden;
    mobileMenu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  /* ---------- header scrollspy and theme ---------- */
  var header = $('#siteHeader'), navFill = $('#navFill');
  var spySections = ['about', 'services', 'fleet', 'industries'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var themeSections = $$('[data-header]');
  var navLinks = $$('.nav-link');
  function moveFill(link) {
    if (!link || !navFill) { if (navFill) navFill.style.opacity = '0'; return; }
    navFill.style.opacity = '1';
    navFill.style.left = link.offsetLeft + 'px';
    navFill.style.width = link.offsetWidth + 'px';
  }
  var currentSpy = null;
  function onScrollHeader() {
    var mid = window.scrollY + window.innerHeight * 0.42;
    var spy = null;
    spySections.forEach(function (sec) { if (sec.offsetTop <= mid) spy = sec.id; });
    if (spy !== currentSpy) {
      currentSpy = spy;
      navLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-spy') === spy); });
      moveFill(navLinks.filter(function (l) { return l.getAttribute('data-spy') === spy; })[0]);
    }
    var theme = 'dark';
    themeSections.forEach(function (sec) { if (sec.offsetTop - 70 <= window.scrollY) theme = sec.getAttribute('data-header'); });
    header.setAttribute('data-theme', theme);
    var toTop = $('#toTop');
    if (toTop) toTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  window.addEventListener('resize', function () { moveFill(navLinks.filter(function (l) { return l.classList.contains('active'); })[0]); });
  onScrollHeader();
  var toTopBtn = $('#toTop');
  if (toTopBtn) toTopBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------- hero shipment card rotation ---------- */
  var shipSlides = $$('.ship-slide'), shipCount = $('#shipCount'), shipProgress = $('#shipProgress');
  var shipIdx = 0, shipTimer = null;
  function showShip(i) {
    shipIdx = i;
    shipSlides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    if (shipCount) shipCount.textContent = (i + 1) + ' / ' + shipSlides.length;
    if (shipProgress) {
      shipProgress.style.transition = 'none';
      shipProgress.style.width = '0%';
      void shipProgress.offsetWidth;
      shipProgress.style.transition = reduceMotion ? 'none' : 'width 3.4s linear';
      shipProgress.style.width = '100%';
    }
  }
  function startShip() {
    if (shipSlides.length < 2) return;
    shipTimer = setInterval(function () { showShip((shipIdx + 1) % shipSlides.length); }, 3400);
  }
  if (shipSlides.length) { showShip(0); if (!reduceMotion) startShip(); }
  var shipCard = $('.ship-card');
  if (shipCard) {
    shipCard.addEventListener('mouseenter', function () { if (shipTimer) clearInterval(shipTimer); });
    shipCard.addEventListener('mouseleave', function () { if (!reduceMotion) { clearInterval(shipTimer); startShip(); } });
  }

  /* ---------- services slider ---------- */
  var svcIdx = 0;
  var svcTitle = $('#svcTitle'), svcBody = $('#svcBody'), svcChips = $('#svcChips'),
      svcFeatures = $('#svcFeatures'), svcIndex = $('#svcIndex'), svcCount = $('#svcCount'),
      svcImg = $('#svcImg'), svcMedia = $('.svc-media'), svcQuote = $('#svcQuote');
  var svcDotsWrap = $('#svcDots'), svcDots = [];
  SERVICES.forEach(function (_, i) {
    var d = document.createElement('button');
    d.setAttribute('aria-label', 'Show service ' + (i + 1));
    d.addEventListener('click', function () { showService(i); });
    svcDotsWrap.appendChild(d); svcDots.push(d);
  });
  function showService(i) {
    svcIdx = (i + SERVICES.length) % SERVICES.length;
    var s = SERVICES[svcIdx];
    svcTitle.textContent = s.title;
    svcBody.textContent = s.body;
    svcIndex.textContent = '[ 0' + (svcIdx + 1) + ' ]';
    svcCount.textContent = '0' + (svcIdx + 1) + ' / 04';
    svcChips.innerHTML = s.chips.map(function (c) { return '<span class="chip">' + c + '</span>'; }).join('');
    svcFeatures.innerHTML = s.features.map(function (f) { return '<div><small>' + f[0] + '</small><strong>' + f[1] + '</strong></div>'; }).join('');
    svcQuote.setAttribute('data-service', s.title);
    svcDots.forEach(function (d, k) { d.classList.toggle('active', k === svcIdx); });
    if (svcMedia && !reduceMotion) {
      svcMedia.classList.remove('inview');
      void svcMedia.offsetWidth;
      svcImg.src = s.img; svcImg.alt = s.alt;
      svcMedia.classList.add('inview');
    } else if (svcImg) { svcImg.src = s.img; svcImg.alt = s.alt; }
  }
  $('#svcPrev').addEventListener('click', function () { showService(svcIdx - 1); });
  $('#svcNext').addEventListener('click', function () { showService(svcIdx + 1); });
  showService(0);

  /* ---------- detail sheet ---------- */
  var sheet = $('#sheet'), sheetBackdrop = $('#sheetBackdrop'), lastFocus = null;
  function openSheet(data) {
    lastFocus = document.activeElement;
    $('#sheetCode').textContent = data.code || '';
    $('#sheetTitle').textContent = data.title;
    $('#sheetIntro').textContent = data.intro || '';
    $('#sheetRows').innerHTML = (data.rows || []).map(function (r) {
      return '<div class="sheet-row"><span>' + r[0] + '</span><strong>' + r[1] + '</strong></div>';
    }).join('');
    $('#sheetTotal').textContent = data.total || '';
    var actions = $('#sheetActions');
    actions.innerHTML = '';
    if (data.quoteService) {
      var b = document.createElement('button');
      b.className = 'btn btn-blue';
      b.textContent = 'Get a quote';
      b.addEventListener('click', function () { closeSheet(); openQuote({ service: data.quoteService, industry: data.quoteIndustry || '' }); });
      actions.appendChild(b);
    }
    if (data.trackRef) {
      var t = document.createElement('button');
      t.className = 'btn btn-white';
      t.textContent = 'Track a sample shipment';
      t.addEventListener('click', function () { closeSheet(); trackShipment(data.trackRef, true); });
      actions.appendChild(t);
    }
    sheet.hidden = false; sheetBackdrop.hidden = false;
    $('#sheetClose').focus();
  }
  function closeSheet() {
    sheet.hidden = true; sheetBackdrop.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#sheetClose').addEventListener('click', closeSheet);
  sheetBackdrop.addEventListener('click', closeSheet);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeSheet(); closeMenu(); } });

  $$('[data-stat]').forEach(function (card) {
    card.addEventListener('click', function () {
      var s = STATS[card.getAttribute('data-stat')];
      if (s) openSheet(s);
    });
  });

  /* ---------- why nexora ---------- */
  var whyRows = $$('.why-row'), whyImgs = $$('#whySlides img');
  var whyIdx = 0;
  function showWhy(i) {
    whyRows.forEach(function (r, k) { r.classList.toggle('is-active', k === i); });
    whyImgs.forEach(function (img, k) {
      img.classList.toggle('is-active', k === i);
      img.classList.toggle('was-active', k === whyIdx && i !== whyIdx);
    });
    whyIdx = i;
  }
  whyRows.forEach(function (row) {
    row.addEventListener('click', function () { showWhy(parseInt(row.getAttribute('data-why'), 10)); });
  });
  var whySec = $('#why');
  if ('IntersectionObserver' in window && whySec && !reduceMotion) {
    var whyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var r = (window.scrollY + window.innerHeight * 0.55 - whySec.offsetTop) / whySec.offsetHeight;
        showWhy(Math.max(0, Math.min(2, Math.floor(r * 3))));
      });
    }, { threshold: [0.15, 0.35, 0.55, 0.75] });
    whyIO.observe(whySec);
    window.addEventListener('scroll', function () {
      var rect = whySec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
        var p = (window.innerHeight * 0.6 - rect.top) / whySec.offsetHeight;
        showWhy(Math.max(0, Math.min(2, Math.floor(p * 3))));
      }
    }, { passive: true });
  }

  /* ---------- tracking ---------- */
  var trackForm = $('#trackForm'), trackInput = $('#trackInput'),
      trackError = $('#trackError'), trackResult = $('#trackResult');
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function renderShipment(d) {
    var stops = d.route.map(function (r) {
      return '<div class="route-stop' + (r[2] ? ' done' : '') + '"><strong>' + esc(r[0]) + '</strong><small>' + esc(r[1]) + '</small></div>';
    }).join('');
    var steps = d.steps.map(function (s, i) {
      return '<div class="status-step' + (i < d.stepsDone ? ' done' : '') + '"><strong>' + esc(s[0]) + '</strong><small>' + esc(s[1]) + '</small></div>';
    }).join('');
    trackResult.innerHTML =
      '<div class="track-card">' +
        '<div class="track-grid">' +
          '<ul class="track-details">' +
            '<li><small>Reference</small><strong>' + esc(d.ref) + '</strong></li>' +
            '<li><small>Container</small><strong>' + esc(d.container) + '</strong></li>' +
            '<li><small>Vessel</small><strong>' + esc(d.vessel) + '</strong></li>' +
            '<li><small>Status</small><span class="status-pill"><i></i>' + esc(d.status) + '</span></li>' +
            '<li class="track-eta"><small>Estimated arrival</small><strong>' + esc(d.eta) + '</strong></li>' +
          '</ul>' +
          '<div>' +
            '<div class="route-diagram"><div class="route-line"><div class="route-fill" style="width:0%"></div>' +
            '<div class="route-ship" style="left:0%"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17l1.5 4h15L21 17M12 17V5m0 0l6 6H6l6-6z" stroke-linejoin="round"/></svg></div></div>' +
            '<div class="route-stops">' + stops + '</div></div>' +
            '<div class="status-steps">' + steps + '</div>' +
            '<div class="track-actions"><button class="btn btn-blue" data-quote-track="' + esc(d.ref) + '">Book the next one like it</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    requestAnimationFrame(function () {
      setTimeout(function () {
        var fill = $('.route-fill', trackResult), ship = $('.route-ship', trackResult);
        if (fill) fill.style.width = d.routeProgress + '%';
        if (ship) ship.style.left = d.routeProgress + '%';
      }, 60);
    });
    var qb = $('[data-quote-track]', trackResult);
    if (qb) qb.addEventListener('click', function () { openQuote({}); });
  }
  function trackShipment(ref, scroll) {
    var key = String(ref || '').trim().toUpperCase();
    var d = SHIPMENTS[key];
    if (!d) {
      trackError.hidden = false;
      trackError.textContent = 'We could not find "' + key + '". Check the reference on your booking confirmation, or follow the sample shipment, NX-482193-RT, to see how tracking works.';
      trackResult.innerHTML = '';
      return;
    }
    trackError.hidden = true;
    trackInput.value = key;
    renderShipment(d);
    if (scroll) $('#tracking').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  trackForm.addEventListener('submit', function (e) { e.preventDefault(); trackShipment(trackInput.value, false); });
  $('#sampleLink').addEventListener('click', function () { trackShipment('NX-482193-RT', false); });
  $$('[data-track-ref]').forEach(function (b) {
    b.addEventListener('click', function () { trackShipment(b.getAttribute('data-track-ref'), true); });
  });
  renderShipment(SHIPMENTS['NX-482193-RT']);

  /* ---------- industries carousel ---------- */
  var carTrack = $('#carTrack'), carousel = $('#carousel'), carProgress = $('#carProgress');
  INDUSTRIES.forEach(function (ind, i) {
    var photo = document.createElement('figure');
    photo.className = 'ind-card ind-photo';
    photo.innerHTML = '<img src="' + ind.img + '" alt="' + ind.alt + '" loading="lazy"><figcaption>[ 0' + (i + 1) + ' ]</figcaption>';
    carTrack.appendChild(photo);
    var card = document.createElement('article');
    card.className = 'ind-card ind-text';
    card.innerHTML = '<h3>' + ind.name + '</h3><p>' + ind.text + '</p>' +
      '<div class="ind-chips">' + ind.chips.map(function (c) { return '<span class="chip">' + c + '</span>'; }).join('') + '</div>' +
      '<button class="ind-link">' + ind.link + ' <span aria-hidden="true">→</span></button>';
    $('.ind-link', card).addEventListener('click', function () {
      openSheet({
        code: 'Industry 0' + (i + 1), title: ind.name, intro: ind.detail,
        rows: ind.chips.map(function (c) { return [c, 'Included']; }),
        total: 'Tell us the route and the volume, and a coordinator will price ' + ind.name.toLowerCase() + ' freight within one working day.',
        quoteService: 'Full supply chain', quoteIndustry: ind.name
      });
    });
    carTrack.appendChild(card);
  });
  var carX = 0;
  function carMax() { return Math.max(0, carTrack.scrollWidth - carousel.clientWidth); }
  function setCar(x) {
    carX = Math.max(0, Math.min(carMax(), x));
    carTrack.style.transform = 'translateX(' + (-carX) + 'px)';
    var max = carMax();
    carProgress.style.width = (max === 0 ? 100 : 12 + (carX / max) * 88) + '%';
  }
  function carStep() {
    var card = $('.ind-card', carTrack);
    return card ? card.offsetWidth + 18 : 340;
  }
  $('#carPrev').addEventListener('click', function () { setCar(carX - carStep() * 2); });
  $('#carNext').addEventListener('click', function () { setCar(carX + carStep() * 2); });
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); setCar(carX + carStep()); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setCar(carX - carStep()); }
  });
  var drag = null;
  carousel.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, start: carX };
    carousel.setPointerCapture(e.pointerId);
  });
  carousel.addEventListener('pointermove', function (e) {
    if (drag) setCar(drag.start - (e.clientX - drag.x));
  });
  ['pointerup', 'pointercancel'].forEach(function (ev) { carousel.addEventListener(ev, function () { drag = null; }); });
  window.addEventListener('resize', function () { setCar(carX); });
  setCar(0);

  /* ---------- quote form ---------- */
  var quoteForm = $('#quoteForm'), qfError = $('#qfError'), qfSuccess = $('#qfSuccess');
  function openQuote(opts) {
    opts = opts || {};
    closeMenu();
    if (opts.service) $('#qfService').value = opts.service;
    if (opts.industry) $('#qfIndustry').value = opts.industry;
    $('#quote').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(function () { $('#qfName').focus({ preventScroll: true }); }, reduceMotion ? 60 : 650);
  }
  $$('[data-quote]').forEach(function (b) {
    b.addEventListener('click', function () {
      openQuote({ service: b.getAttribute('data-service') || '' });
    });
  });
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#qfName').value.trim(), email = $('#qfEmail').value.trim(),
        from = $('#qfFrom').value.trim(), to = $('#qfTo').value.trim(),
        cargo = $('#qfCargo').value.trim();
    var problems = [];
    if (name.length < 2) problems.push('your name');
    if (!validEmail(email)) problems.push('a valid work email');
    if (!from) problems.push('where the goods start');
    if (!to) problems.push('where they are going');
    if (cargo.length < 4) problems.push('a line about what you are shipping');
    if (problems.length) {
      qfError.hidden = false;
      qfError.textContent = 'Almost there. We still need ' + problems.join(', ') + '.';
      qfSuccess.hidden = true;
      return;
    }
    qfError.hidden = true;
    var ref = 'NX-Q' + Math.floor(1000 + Math.random() * 9000);
    $('#qfSuccessText').textContent = 'Thank you, ' + name.split(' ')[0] + '. Your reference is ' + ref + '. A coordinator will reply to ' + email + ' within one working day with a route, a timeline and a fixed price for ' + from + ' to ' + to + '.';
    qfSuccess.hidden = false;
    qfSuccess.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  });
  $('#qfAgain').addEventListener('click', function () {
    quoteForm.reset();
    qfSuccess.hidden = true;
    $('#qfName').focus();
  });

  /* test hook */
  window.__nexora = {
    SHIPMENTS: SHIPMENTS, SERVICES: SERVICES, INDUSTRIES: INDUSTRIES, STATS: STATS,
    trackShipment: trackShipment, showService: showService, openSheet: openSheet
  };
})();
