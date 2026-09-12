/* =========================================================================
   Shrimad Rajchandra Ashram, Devlali — Audio Book player
   -------------------------------------------------------------------------
   Reads chapter data from AUDIOBOOK_CHAPTERS / AUDIOBOOK_SECTIONS
   (assets/js/audiobook-data.js, loaded before this file). Everything here
   is generic — to add, rename, or re-order chapters, edit
   audiobook-data.js instead of this file.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  var page = document.getElementById('audiobook-page');
  if (!page || typeof AUDIOBOOK_CHAPTERS === 'undefined') return;

  var chapters = AUDIOBOOK_CHAPTERS;
  var sections = AUDIOBOOK_SECTIONS;
  var STORAGE_KEY = 'srsmd-audiobook-progress-v2';

  /* ---------- Persisted state ---------- */
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) throw new Error('none');
      var parsed = JSON.parse(raw);
      return {
        lastChapterId: parsed.lastChapterId || null,
        lastTime: parsed.lastTime || 0,
        completed: parsed.completed || {},
        favorites: parsed.favorites || {},
        chapterTime: parsed.chapterTime || {},
        fontSize: parsed.fontSize || 'medium',
        autoplay: parsed.autoplay !== false,
        lang: parsed.lang || 'gu',
        simpleMode: parsed.simpleMode || false
      };
    } catch (e) {
      return { lastChapterId: null, lastTime: 0, completed: {}, favorites: {}, chapterTime: {}, fontSize: 'medium', autoplay: true, lang: 'gu', simpleMode: false };
    }
  }
  var state = loadState();
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable — fail silently */ }
  }

  /* ---------- Elements ---------- */
  var audio = document.getElementById('ab-audio');
  var playBtn = document.getElementById('ab-play');
  var skipBackBtn = document.getElementById('ab-skip-back');
  var skipFwdBtn = document.getElementById('ab-skip-fwd');
  var prevChBtn = document.getElementById('ab-prev-chapter');
  var nextChBtn = document.getElementById('ab-next-chapter');
  var seekBar = document.getElementById('ab-seek');
  var currentTimeEl = document.getElementById('ab-current-time');
  var durationEl = document.getElementById('ab-duration');
  var titleEl = document.getElementById('ab-title');
  var eyebrowEl = document.getElementById('ab-current-chapter-eyebrow');
  var speedSelect = document.getElementById('ab-speed');
  var sleepSelect = document.getElementById('ab-sleep');
  var autoplayToggle = document.getElementById('ab-autoplay');
  var simpleModeToggle = document.getElementById('ab-simple-mode');
  var playerCard = document.getElementById('ab-player-card');
  var transcriptText = document.getElementById('ab-transcript-text');
  var fontButtons = document.querySelectorAll('.font-size-controls button');
  var downloadLink = document.getElementById('ab-download');
  var shareBtn = document.getElementById('ab-share');
  var unavailableNotice = document.getElementById('ab-unavailable');

  var searchInputs = document.querySelectorAll('.chapter-search');
  var filterButtonGroups = document.querySelectorAll('.chapter-filter-row');
  var listContainers = document.querySelectorAll('.chapter-list');

  var continueBanner = document.getElementById('ab-continue-banner');
  var continueTitle = document.getElementById('ab-continue-title');
  var continueBtn = document.getElementById('ab-continue-btn');

  var drawer = document.getElementById('ab-chapter-drawer');
  var drawerToggle = document.getElementById('ab-chapter-drawer-toggle');
  var drawerClose = document.getElementById('ab-chapter-drawer-close');

  var langButtons = document.querySelectorAll('.lang-toggle button');

  var currentChapterId = null;
  var currentFilter = 'all'; // 'all' | 'favorites'
  var sleepTimeoutId = null;
  var sleepAtChapterEnd = false;
  var audioAvailable = true;

  /* ---------- Language helpers ---------- */
  function t(ch, field) { // e.g. t(ch, 'title') -> ch.title_gu or ch.title_en
    return ch[field + '_' + state.lang] || ch[field + '_en'] || ch[field + '_gu'] || '';
  }
  function applyStaticTranslations() {
    document.querySelectorAll('[data-gu][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + state.lang);
    });
    document.querySelectorAll('[data-gu-placeholder]').forEach(function (el) {
      el.placeholder = state.lang === 'gu' ? el.getAttribute('data-gu-placeholder') : 'Search chapters…';
    });
    langButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === state.lang); });
    document.documentElement.lang = (state.lang === 'gu') ? 'gu' : 'en';
  }

  /* ---------- Helpers ---------- */
  function findChapter(id) {
    for (var i = 0; i < chapters.length; i++) { if (chapters[i].id === id) return chapters[i]; }
    return null;
  }
  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function completedCount() {
    var n = 0;
    chapters.forEach(function (ch) { if (state.completed[ch.id]) n++; });
    return n;
  }
  function updateProgressRings() {
    var done = completedCount();
    var total = chapters.length;
    var pct = total ? done / total : 0;
    var circumference = 113; // 2 * PI * r(18), matches the SVG markup
    ['sidebar', 'drawer'].forEach(function (which) {
      var ring = document.getElementById('ab-progress-ring-fill-' + which);
      var count = document.getElementById('ab-progress-count-' + which);
      if (ring) ring.setAttribute('stroke-dashoffset', String(circumference * (1 - pct)));
      if (count) count.textContent = done + ' ' + (state.lang === 'gu' ? 'માંથી' : 'of') + ' ' + total;
    });
  }

  /* ---------- Render chapter lists (grouped by section; sidebar + drawer share the same shape) ---------- */
  function renderLists() {
    listContainers.forEach(function (container) {
      var query = (container.closest('.chapter-panel').querySelector('.chapter-search') || {}).value || '';
      query = query.trim().toLowerCase();

      var filtered = chapters.filter(function (ch) {
        var matchesSearch = t(ch, 'title').toLowerCase().indexOf(query) !== -1 || String(ch.id).indexOf(query) !== -1;
        var matchesFilter = currentFilter === 'all' || !!state.favorites[ch.id];
        return matchesSearch && matchesFilter;
      });

      container.innerHTML = '';
      if (!filtered.length) {
        var empty = document.createElement('li');
        empty.className = 'chapter-empty';
        empty.textContent = currentFilter === 'favorites'
          ? (state.lang === 'gu' ? 'હજુ સુધી કોઈ પ્રિય પ્રકરણ નથી.' : 'No favourite chapters yet.')
          : (state.lang === 'gu' ? 'શોધ સાથે મેળ ખાતું કંઈ મળ્યું નથી.' : 'No chapters match your search.');
        container.appendChild(empty);
        return;
      }

      var lastSection = null;
      filtered.forEach(function (ch) {
        if (ch.section !== lastSection) {
          lastSection = ch.section;
          var sec = sections[ch.section];
          if (sec) {
            var header = document.createElement('li');
            header.className = 'chapter-section-header';
            var numPart = sec.num ? (sec.num + '. ') : '';
            var pagePart = sec.pageRange ? ' <span class="chapter-section-pages">p. ' + sec.pageRange + '</span>' : '';
            header.innerHTML = numPart + (state.lang === 'gu' ? sec.title_gu : sec.title_en) + pagePart;
            container.appendChild(header);
          }
        }

        var li = document.createElement('li');
        var btn = document.createElement('button');
        var isUnavailable = state.audioMissing && state.audioMissing[ch.id];
        btn.className = 'chapter-item'
          + (ch.id === currentChapterId ? ' active' : '')
          + (state.completed[ch.id] ? ' completed' : '')
          + (isUnavailable ? ' unavailable' : '');
        btn.setAttribute('data-chapter-id', ch.id);

        var pct = 0;
        var progress = state.chapterTime[ch.id];
        if (progress && progress.duration) pct = Math.min(100, Math.round((progress.time / progress.duration) * 100));
        if (state.completed[ch.id]) pct = 100;

        var authorLine = ch.author_gu ? ('<span class="chapter-item-author">' + (state.lang === 'gu' ? ch.author_gu : ch.author_en) + '</span>') : '';
        var unavailableLine = isUnavailable ? ('<span class="chapter-item-unavailable-tag">' + (state.lang === 'gu' ? 'રેકોર્ડિંગ ટૂંક સમયમાં ઉમેરાશે' : 'Recording coming soon') + '</span>') : '';

        btn.innerHTML =
          '<span class="chapter-item-num">' + (state.completed[ch.id] ? '&#10003;' : ch.id) + '</span>' +
          '<span class="chapter-item-body">' +
            '<span class="chapter-item-title">' + t(ch, 'title') + '</span>' +
            authorLine +
            unavailableLine +
            '<span class="chapter-item-progress"><span class="chapter-item-progress-fill" style="width:' + pct + '%"></span></span>' +
          '</span>' +
          '<span class="chapter-item-page">p.' + ch.page + '</span>' +
          '<button type="button" class="chapter-item-star' + (state.favorites[ch.id] ? ' favorited' : '') + '" aria-label="Favourite this chapter" data-fav-id="' + ch.id + '">' + (state.favorites[ch.id] ? '&#9733;' : '&#9734;') + '</button>';

        li.appendChild(btn);
        container.appendChild(li);
      });
    });
    updateProgressRings();
  }

  /* ---------- Transcript ---------- */
  function renderTranscript(text) {
    transcriptText.innerHTML = '';
    var paragraphs = text.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
    if (!paragraphs.length) {
      var p = document.createElement('p');
      p.textContent = text.trim();
      transcriptText.appendChild(p);
      return;
    }
    paragraphs.forEach(function (para) {
      var p = document.createElement('p');
      p.textContent = para;
      transcriptText.appendChild(p);
    });
  }
  function loadTranscript(ch) {
    transcriptText.innerHTML = '<p class="transcript-placeholder">' + (state.lang === 'gu' ? 'લખાણ લોડ થાય છે…' : 'Loading transcript…') + '</p>';
    fetch(ch.text)
      .then(function (res) { if (!res.ok) throw new Error('missing'); return res.text(); })
      .then(renderTranscript)
      .catch(function () {
        transcriptText.innerHTML = '<p class="transcript-placeholder">' + (state.lang === 'gu' ? 'આ પ્રકરણ માટે લખાણ ટૂંક સમયમાં ઉમેરાશે.' : 'Transcript coming soon for this chapter.') + '</p>';
      });
  }

  /* ---------- Media Session (lock screen / notification controls) ---------- */
  function updateMediaSession(ch) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: t(ch, 'title'),
      artist: 'Shrimad Rajchandra Ashram, Devlali',
      album: 'Samadhi Sopan — Audio Book'
    });
    navigator.mediaSession.setActionHandler('play', function () { audio.play().catch(function () {}); });
    navigator.mediaSession.setActionHandler('pause', function () { audio.pause(); });
    navigator.mediaSession.setActionHandler('previoustrack', function () { prevChBtn.click(); });
    navigator.mediaSession.setActionHandler('nexttrack', function () { nextChBtn.click(); });
    navigator.mediaSession.setActionHandler('seekbackward', function () { audio.currentTime = Math.max(0, audio.currentTime - 15); });
    navigator.mediaSession.setActionHandler('seekforward', function () { audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 15); });
  }

  /* ---------- Loading a chapter ---------- */
  function loadChapter(id, opts) {
    opts = opts || {};
    var ch = findChapter(id);
    if (!ch) return;
    currentChapterId = id;
    audioAvailable = true;
    if (unavailableNotice) unavailableNotice.style.display = 'none';

    var idx = chapters.indexOf(ch);
    eyebrowEl.textContent = (state.lang === 'gu' ? 'હવે વાગી રહ્યું છે — પ્રકરણ ' : 'Now playing — Chapter ') + ch.id + ' / ' + chapters.length;
    titleEl.textContent = t(ch, 'title');
    audio.src = ch.audio;
    loadTranscript(ch);
    updateMediaSession(ch);

    if (downloadLink) { downloadLink.href = ch.audio; downloadLink.setAttribute('download', ''); }

    prevChBtn.disabled = (idx === 0);
    nextChBtn.disabled = (idx === chapters.length - 1);

    var startAt = typeof opts.seekTo === 'number' ? opts.seekTo : 0;
    audio.addEventListener('loadedmetadata', function onMeta() {
      audio.removeEventListener('loadedmetadata', onMeta);
      if (startAt > 0 && startAt < audio.duration) audio.currentTime = startAt;
      durationEl.textContent = formatTime(audio.duration);
      seekBar.max = Math.floor(audio.duration) || 0;
    });

    if (opts.autoplay) {
      audio.play().catch(function () { /* autoplay may be blocked until user interacts — fine */ });
    }

    state.lastChapterId = id;
    saveState();
    renderLists();
    window.location.hash = 'chapter-' + id;
    hideDrawer();
  }

  /* Handle a chapter whose mp3 file hasn't been uploaded yet */
  audio.addEventListener('error', function () {
    if (!currentChapterId) return;
    audioAvailable = false;
    state.audioMissing = state.audioMissing || {};
    state.audioMissing[currentChapterId] = true;
    if (unavailableNotice) unavailableNotice.style.display = 'block';
    renderLists();
  });

  /* ---------- Continue banner ---------- */
  function setupContinueBanner() {
    if (!state.lastChapterId) return;
    var ch = findChapter(state.lastChapterId);
    if (!ch) return;
    var progress = state.chapterTime[state.lastChapterId];
    if (state.completed[state.lastChapterId]) return;
    if (!progress || progress.time < 3) return;

    continueTitle.textContent = t(ch, 'title');
    continueBanner.classList.add('visible');
    continueBtn.addEventListener('click', function () {
      loadChapter(ch.id, { seekTo: progress.time });
      continueBanner.classList.remove('visible');
    });
  }

  /* ---------- Playback controls ---------- */
  function togglePlay() {
    if (!audioAvailable) return;
    if (audio.paused) audio.play().catch(function () {}); else audio.pause();
  }
  playBtn.addEventListener('click', togglePlay);
  audio.addEventListener('play', function () { playBtn.innerHTML = '&#10074;&#10074;'; playBtn.setAttribute('aria-label', 'Pause'); });
  audio.addEventListener('pause', function () { playBtn.innerHTML = '&#9654;'; playBtn.setAttribute('aria-label', 'Play'); });

  skipBackBtn.addEventListener('click', function () { audio.currentTime = Math.max(0, audio.currentTime - 15); });
  skipFwdBtn.addEventListener('click', function () { audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 15); });

  prevChBtn.addEventListener('click', function () {
    var idx = chapters.findIndex(function (c) { return c.id === currentChapterId; });
    if (idx > 0) loadChapter(chapters[idx - 1].id, { autoplay: !audio.paused });
  });
  nextChBtn.addEventListener('click', function () {
    var idx = chapters.findIndex(function (c) { return c.id === currentChapterId; });
    if (idx < chapters.length - 1) loadChapter(chapters[idx + 1].id, { autoplay: !audio.paused });
  });

  seekBar.addEventListener('input', function () { audio.currentTime = Number(seekBar.value); });

  var lastSaveTs = 0;
  audio.addEventListener('timeupdate', function () {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    if (!isNaN(audio.duration)) seekBar.value = Math.floor(audio.currentTime);

    var now = Date.now();
    if (now - lastSaveTs > 2000) {
      lastSaveTs = now;
      state.lastTime = audio.currentTime;
      state.chapterTime[currentChapterId] = { time: audio.currentTime, duration: audio.duration || 0 };
      saveState();
      updateSingleChapterProgress(currentChapterId);
    }
  });

  function updateSingleChapterProgress(id) {
    document.querySelectorAll('.chapter-item[data-chapter-id="' + id + '"] .chapter-item-progress-fill').forEach(function (fill) {
      var progress = state.chapterTime[id];
      if (progress && progress.duration) fill.style.width = Math.min(100, Math.round((progress.time / progress.duration) * 100)) + '%';
    });
  }

  audio.addEventListener('ended', function () {
    state.completed[currentChapterId] = true;
    saveState();
    renderLists();

    if (sleepAtChapterEnd) {
      sleepAtChapterEnd = false;
      sleepSelect.value = 'off';
      return;
    }

    var idx = chapters.findIndex(function (c) { return c.id === currentChapterId; });
    if (state.autoplay && idx < chapters.length - 1) {
      loadChapter(chapters[idx + 1].id, { autoplay: true });
    }
  });

  /* ---------- Speed ---------- */
  speedSelect.addEventListener('change', function () { audio.playbackRate = Number(speedSelect.value); });

  /* ---------- Sleep timer ---------- */
  sleepSelect.addEventListener('change', function () {
    if (sleepTimeoutId) { clearTimeout(sleepTimeoutId); sleepTimeoutId = null; }
    sleepAtChapterEnd = false;
    var val = sleepSelect.value;
    if (val === 'off') return;
    if (val === 'chapter') { sleepAtChapterEnd = true; return; }
    var minutes = Number(val);
    sleepTimeoutId = setTimeout(function () {
      audio.pause();
      sleepSelect.value = 'off';
    }, minutes * 60 * 1000);
  });

  /* ---------- Autoplay-next toggle ---------- */
  autoplayToggle.checked = state.autoplay;
  autoplayToggle.addEventListener('change', function () { state.autoplay = autoplayToggle.checked; saveState(); });

  /* ---------- Simple mode toggle ---------- */
  if (simpleModeToggle) {
    simpleModeToggle.checked = state.simpleMode;
    playerCard.classList.toggle('simple', state.simpleMode);
    simpleModeToggle.addEventListener('change', function () {
      state.simpleMode = simpleModeToggle.checked;
      playerCard.classList.toggle('simple', state.simpleMode);
      saveState();
    });
  }

  /* ---------- Share this chapter ---------- */
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var ch = findChapter(currentChapterId);
      if (!ch) return;
      var url = window.location.origin + window.location.pathname + '#chapter-' + ch.id;
      var shareData = { title: t(ch, 'title'), text: t(ch, 'title') + ' — Samadhi Sopan Audio Book', url: url };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () {
          shareBtn.textContent = state.lang === 'gu' ? 'લિંક કૉપિ થઈ ગઈ ✓' : 'Link copied ✓';
          setTimeout(function () { shareBtn.innerHTML = '&#128279;&nbsp; ' + (state.lang === 'gu' ? 'આ પ્રકરણ શેર કરો' : 'Share this chapter'); }, 2000);
        }).catch(function () {});
      }
    });
  }

  /* ---------- Favourites + chapter selection (event-delegated) ---------- */
  document.addEventListener('click', function (e) {
    var star = e.target.closest('.chapter-item-star');
    if (star) {
      e.stopPropagation();
      var id = Number(star.getAttribute('data-fav-id'));
      state.favorites[id] = !state.favorites[id];
      saveState();
      renderLists();
      return;
    }
    var item = e.target.closest('.chapter-item');
    if (item) {
      var chId = Number(item.getAttribute('data-chapter-id'));
      loadChapter(chId, { autoplay: !audio.paused && audio.currentTime > 0 ? true : false });
    }
  });

  /* ---------- Search + filter ---------- */
  searchInputs.forEach(function (input) { input.addEventListener('input', renderLists); });
  filterButtonGroups.forEach(function (group) {
    group.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentFilter = btn.getAttribute('data-filter');
        filterButtonGroups.forEach(function (g) {
          g.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === currentFilter); });
        });
        renderLists();
      });
    });
  });

  /* ---------- Font size ---------- */
  function applyFontSize(size) {
    state.fontSize = size;
    transcriptText.className = 'transcript-text font-' + size;
    fontButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-size') === size); });
    saveState();
  }
  fontButtons.forEach(function (b) { b.addEventListener('click', function () { applyFontSize(b.getAttribute('data-size')); }); });
  applyFontSize(state.fontSize);

  /* ---------- Translate <select> option text (native selects need JS, not data-attrs) ---------- */
  var speedLabels = { gu: ['0.75x', '1x (સામાન્ય)', '1.25x', '1.5x', '2x'], en: ['0.75x', '1x (normal)', '1.25x', '1.5x', '2x'] };
  var sleepLabels = { gu: ['બંધ', '15 મિનિટ', '30 મિનિટ', '45 મિનિટ', 'પ્રકરણના અંતે'], en: ['Off', '15 min', '30 min', '45 min', 'End of chapter'] };
  function applySelectTranslations() {
    Array.prototype.forEach.call(speedSelect.options, function (opt, i) { opt.textContent = speedLabels[state.lang][i]; });
    Array.prototype.forEach.call(sleepSelect.options, function (opt, i) { opt.textContent = sleepLabels[state.lang][i]; });
  }

  /* ---------- Language toggle ---------- */
  langButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      state.lang = b.getAttribute('data-lang');
      saveState();
      applyStaticTranslations();
      applySelectTranslations();
      renderLists();
      var ch = findChapter(currentChapterId);
      if (ch) {
        titleEl.textContent = t(ch, 'title');
        eyebrowEl.textContent = (state.lang === 'gu' ? 'હવે વાગી રહ્યું છે — પ્રકરણ ' : 'Now playing — Chapter ') + ch.id + ' / ' + chapters.length;
      }
    });
  });
  applyStaticTranslations();
  applySelectTranslations();

  /* ---------- Mobile drawer ---------- */
  function showDrawer() { if (drawer) drawer.classList.add('open'); }
  function hideDrawer() { if (drawer) drawer.classList.remove('open'); }
  if (drawerToggle) drawerToggle.addEventListener('click', showDrawer);
  if (drawerClose) drawerClose.addEventListener('click', hideDrawer);
  if (drawer) drawer.addEventListener('click', function (e) { if (e.target === drawer) hideDrawer(); });

  /* ---------- Keyboard shortcuts (only when not typing in a field) ---------- */
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - 15);
    if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 15);
  });

  /* ---------- Initial load ---------- */
  renderLists();
  setupContinueBanner();

  var hashId = parseInt((window.location.hash || '').replace('#chapter-', ''), 10);
  var startId = hashId && findChapter(hashId) ? hashId : 1;
  loadChapter(startId, { seekTo: 0 });

});
