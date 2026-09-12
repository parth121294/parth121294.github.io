/* =========================================================================
   Shrimad Rajchandra Ashram, Devlali — Site script
   -------------------------------------------------------------------------
   Plain JavaScript, no jQuery or other libraries needed. Three small
   independent features, each safe to leave alone:
     1. Mobile menu open/close
     2. Hero image slider
     3. Photo gallery lightbox (tap a photo to see it larger)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 0. Track real header height as a CSS variable ----------
     Sticky elements (like the chapter sidebar on the audio book page)
     use this instead of a hardcoded pixel guess, so they never overlap
     the header even if it wraps to two lines on an odd screen width. */
  var headerEl = document.querySelector('.site-header');
  if (headerEl) {
    var setHeaderHeightVar = function () {
      document.documentElement.style.setProperty('--header-height', headerEl.offsetHeight + 'px');
    };
    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);
    if (window.ResizeObserver) { new ResizeObserver(setHeaderHeightVar).observe(headerEl); }
  }

  /* ---------- 1. Mobile menu ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu after tapping a link (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Hero slider ---------- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    var current = 0;
    var dots = document.querySelectorAll('.hero-dots button');
    var prevBtn = document.querySelector('.hero-prev');
    var nextBtn = document.querySelector('.hero-next');
    var timer;

    function show(index) {
      heroSlides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + heroSlides.length) % heroSlides.length;
      heroSlides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function restartTimer() {
      clearInterval(timer);
      timer = setInterval(function () { show(current + 1); }, 6000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); restartTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); restartTimer(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); restartTimer(); });
    });

    restartTimer();
  }

  /* ---------- 3. Gallery lightbox ---------- */
  var galleryButtons = document.querySelectorAll('.gallery-grid button');
  var lightbox = document.querySelector('.lightbox');
  if (galleryButtons.length && lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn2 = lightbox.querySelector('.lightbox-prev');
    var nextBtn2 = lightbox.querySelector('.lightbox-next');
    var images = Array.prototype.map.call(galleryButtons, function (btn) {
      return { full: btn.getAttribute('data-full'), alt: btn.querySelector('img').alt };
    });
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      lightboxImg.src = images[lbIndex].full;
      lightboxImg.alt = images[lbIndex].alt;
      lightbox.classList.add('open');
      closeBtn.focus();
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }
    function showRelative(delta) {
      lbIndex = (lbIndex + delta + images.length) % images.length;
      lightboxImg.src = images[lbIndex].full;
      lightboxImg.alt = images[lbIndex].alt;
    }

    galleryButtons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { openLightbox(i); });
    });
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn2.addEventListener('click', function () { showRelative(-1); });
    nextBtn2.addEventListener('click', function () { showRelative(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    });
  }

  /* ---------- 4. Book reader (biography / teachings pages) ----------
     Looks for an element with id="reader" carrying a data-images
     attribute: a comma-separated list of image paths, in page order.
     Nothing to configure here — set that attribute in the HTML file. */
  var readerEl = document.getElementById('reader');
  if (readerEl) {
    var pages = readerEl.getAttribute('data-images').split(',').map(function (s) { return s.trim(); });
    var total = pages.length;
    var pageIndex = 0;

    var img = readerEl.querySelector('.reader-image-wrap img');
    var posLabel = readerEl.querySelector('.reader-position .current');
    var totalLabel = readerEl.querySelector('.reader-position .total');
    var prevBtn3 = readerEl.querySelector('.reader-prev');
    var nextBtn3 = readerEl.querySelector('.reader-next');
    var jumpInput = readerEl.querySelector('.reader-jump input');
    var jumpBtn = readerEl.querySelector('.reader-jump button');

    if (totalLabel) totalLabel.textContent = total;
    if (jumpInput) { jumpInput.max = total; jumpInput.min = 1; }

    function renderPage() {
      img.src = pages[pageIndex];
      img.alt = 'Page ' + (pageIndex + 1) + ' of ' + total;
      if (posLabel) posLabel.textContent = pageIndex + 1;
      if (prevBtn3) prevBtn3.disabled = (pageIndex === 0);
      if (nextBtn3) nextBtn3.disabled = (pageIndex === total - 1);
      if (jumpInput) jumpInput.value = pageIndex + 1;
      readerEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    function goTo(n) {
      pageIndex = Math.min(Math.max(n, 0), total - 1);
      renderPage();
    }

    if (prevBtn3) prevBtn3.addEventListener('click', function () { goTo(pageIndex - 1); });
    if (nextBtn3) nextBtn3.addEventListener('click', function () { goTo(pageIndex + 1); });
    if (jumpBtn) jumpBtn.addEventListener('click', function () {
      goTo(parseInt(jumpInput.value, 10) - 1);
    });

    document.addEventListener('keydown', function (e) {
      if (document.activeElement === jumpInput) return;
      if (e.key === 'ArrowLeft') goTo(pageIndex - 1);
      if (e.key === 'ArrowRight') goTo(pageIndex + 1);
    });

    // Basic swipe support on the image itself
    var touchStartX = null;
    var imgWrap = readerEl.querySelector('.reader-image-wrap');
    imgWrap.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    imgWrap.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? goTo(pageIndex + 1) : goTo(pageIndex - 1); }
      touchStartX = null;
    });

    renderPage();
  }

});
