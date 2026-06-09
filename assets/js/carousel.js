// Image carousel — initializes every [data-carousel] on the page.
// Markup contract: see assets/css/carousel.css and the style-guide demo.

(function () {
    function initCarousel(root) {
        const track = root.querySelector('.carousel-track');
        const slides = root.querySelectorAll('.carousel-slide');
        const prevBtn = root.querySelector('.carousel-prev');
        const nextBtn = root.querySelector('.carousel-next');
        const dotsWrap = root.querySelector('.carousel-dots');
        const counter = root.querySelector('.carousel-counter');

        if (!track || slides.length === 0) return;

        const total = slides.length;
        let index = 0;

        if (total <= 1) {
            if (prevBtn)  prevBtn.hidden  = true;
            if (nextBtn)  nextBtn.hidden  = true;
            if (dotsWrap) dotsWrap.hidden = true;
            if (counter)  counter.hidden  = true;
        }

        // Build dot buttons.
        const dots = [];
        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
                dots.push(dot);
            }
        }

        function update() {
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
            dots.forEach((d, i) => {
                if (i === index) d.setAttribute('aria-current', 'true');
                else d.removeAttribute('aria-current');
            });
            if (counter) counter.textContent = (index + 1) + ' / ' + total;
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === total - 1;
            slides.forEach((s, i) => {
                s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
            });
            // Sync external captions (live outside overflow:hidden viewport).
            const extCaptions = root.querySelectorAll('.carousel-captions > .carousel-caption');
            extCaptions.forEach(function(cap, i) { cap.hidden = i !== index; });
        }

        function goTo(i) {
            index = Math.max(0, Math.min(total - 1, i));
            update();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

        // Keyboard nav when focus is anywhere inside the carousel.
        root.setAttribute('tabindex', root.getAttribute('tabindex') || '0');
        root.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
        });

        update();
    }

    // --- Lightbox (singleton, lazy-built) ---
    let lightbox = null;
    let lastFocus = null;
    let lightboxImages = [];
    let lightboxIndex  = 0;

    // --- Zoom / pan state ---
    let zoomLevel = 1;
    const ZOOM_MIN = 1, ZOOM_MAX = 4, ZOOM_STEP = 0.5;
    let panX = 0, panY = 0;
    let isDragging = false, didDrag = false;
    let dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;

    function setZoom(level) {
        zoomLevel = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, level));
        if (zoomLevel === ZOOM_MIN) { panX = 0; panY = 0; }
        const img = lightbox.querySelector('.carousel-lightbox-img');
        img.style.transform = zoomLevel === 1
            ? ''
            : 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoomLevel + ')';
        img.style.cursor = zoomLevel > 1 ? 'grab' : '';
        lightbox.querySelector('.carousel-lightbox-zoom-out').disabled = zoomLevel <= ZOOM_MIN;
        lightbox.querySelector('.carousel-lightbox-zoom-in').disabled  = zoomLevel >= ZOOM_MAX;
    }

    function resetZoom() {
        zoomLevel = 1; panX = 0; panY = 0;
        if (!lightbox) return;
        const img = lightbox.querySelector('.carousel-lightbox-img');
        if (img) { img.style.transform = ''; img.style.cursor = ''; }
        lightbox.querySelector('.carousel-lightbox-zoom-out').disabled = true;
        lightbox.querySelector('.carousel-lightbox-zoom-in').disabled  = false;
    }

    function buildLightbox() {
        const el = document.createElement('div');
        el.className = 'carousel-lightbox';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-label', 'Image preview');
        el.hidden = true;
        el.innerHTML = ''
            + '<button type="button" class="carousel-lightbox-close" aria-label="Close preview">'
            + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
            + '</button>'
            + '<div class="carousel-lightbox-zoom">'
            + '<button type="button" class="carousel-lightbox-zoom-out" aria-label="Zoom out" disabled>'
            + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>'
            + '</button>'
            + '<button type="button" class="carousel-lightbox-zoom-in" aria-label="Zoom in">'
            + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>'
            + '</button>'
            + '</div>'
            + '<button type="button" class="carousel-lightbox-prev" aria-label="Previous image" hidden>'
            + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>'
            + '</button>'
            + '<button type="button" class="carousel-lightbox-next" aria-label="Next image" hidden>'
            + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
            + '</button>'
            + '<figure class="carousel-lightbox-figure">'
            + '<img class="carousel-lightbox-img" alt="">'
            + '<figcaption class="carousel-lightbox-caption" hidden></figcaption>'
            + '<div class="carousel-lightbox-dots" hidden></div>'
            + '</figure>';

        // Overlay click closes (but not when dragging).
        el.addEventListener('click', e => {
            if (e.target === el && !didDrag) closeLightbox();
        });
        el.querySelector('.carousel-lightbox-close').addEventListener('click', closeLightbox);
        el.querySelector('.carousel-lightbox-prev').addEventListener('click', () => navigateLightbox(lightboxIndex - 1));
        el.querySelector('.carousel-lightbox-next').addEventListener('click', () => navigateLightbox(lightboxIndex + 1));
        el.querySelector('.carousel-lightbox-zoom-out').addEventListener('click', () => setZoom(zoomLevel - ZOOM_STEP));
        el.querySelector('.carousel-lightbox-zoom-in').addEventListener('click',  () => setZoom(zoomLevel + ZOOM_STEP));

        // Keyboard: escape/arrows/zoom shortcuts.
        document.addEventListener('keydown', e => {
            if (!lightbox || lightbox.hidden) return;
            if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateLightbox(lightboxIndex - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); navigateLightbox(lightboxIndex + 1); }
            if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(zoomLevel + ZOOM_STEP); }
            if (e.key === '-')  { e.preventDefault(); setZoom(zoomLevel - ZOOM_STEP); }
            if (e.key === '0')  { e.preventDefault(); resetZoom(); }
        });

        // Mouse wheel zoom.
        el.addEventListener('wheel', e => {
            if (lightbox.hidden) return;
            e.preventDefault();
            setZoom(zoomLevel + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
        }, { passive: false });

        // Drag/pan on the lightbox image.
        const img = el.querySelector('.carousel-lightbox-img');
        img.addEventListener('mousedown', e => {
            if (zoomLevel <= 1) return;
            e.preventDefault();
            isDragging = true;
            didDrag = false;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            panStartX = panX;
            panStartY = panY;
            img.style.cursor = 'grabbing';
            el.classList.add('is-dragging');
        });
        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didDrag = true;
            panX = panStartX + dx;
            panY = panStartY + dy;
            img.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoomLevel + ')';
        });
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            if (lightbox && !lightbox.hidden && zoomLevel > 1) img.style.cursor = 'grab';
            el.classList.remove('is-dragging');
            // Keep didDrag=true briefly so the click handler on the overlay won't fire.
            setTimeout(() => { didDrag = false; }, 0);
        });

        document.body.appendChild(el);
        return el;
    }

    function updateLightboxNav() {
        const prevBtn  = lightbox.querySelector('.carousel-lightbox-prev');
        const nextBtn  = lightbox.querySelector('.carousel-lightbox-next');
        const dotsWrap = lightbox.querySelector('.carousel-lightbox-dots');
        const multi    = lightboxImages.length > 1;
        prevBtn.hidden  = !multi;
        nextBtn.hidden  = !multi;
        dotsWrap.hidden = !multi;
        if (multi) {
            prevBtn.disabled = lightboxIndex === 0;
            nextBtn.disabled = lightboxIndex === lightboxImages.length - 1;
            dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
                if (i === lightboxIndex) d.setAttribute('aria-current', 'true');
                else d.removeAttribute('aria-current');
            });
        }
    }

    function navigateLightbox(newIndex) {
        if (!lightboxImages.length || newIndex < 0 || newIndex >= lightboxImages.length) return;
        lightboxIndex = newIndex;
        const item = lightboxImages[lightboxIndex];
        const img  = lightbox.querySelector('.carousel-lightbox-img');
        const cap  = lightbox.querySelector('.carousel-lightbox-caption');
        resetZoom();
        img.src = item.src;
        img.alt = item.alt || '';
        if (item.caption) { cap.textContent = item.caption; cap.hidden = false; }
        else              { cap.textContent = ''; cap.hidden = true; }
        updateLightboxNav();
    }

    function openLightbox(src, alt, caption, images, startIndex) {
        if (!lightbox) lightbox = buildLightbox();
        lightboxImages = images || [];
        lightboxIndex  = startIndex !== undefined ? startIndex : 0;
        const dotsWrap = lightbox.querySelector('.carousel-lightbox-dots');
        dotsWrap.innerHTML = '';
        lightboxImages.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
            dot.addEventListener('click', () => navigateLightbox(i));
            dotsWrap.appendChild(dot);
        });
        const img = lightbox.querySelector('.carousel-lightbox-img');
        const cap = lightbox.querySelector('.carousel-lightbox-caption');
        resetZoom();
        img.src = src;
        img.alt = alt || '';
        if (caption) {
            cap.textContent = caption;
            cap.hidden = false;
        } else {
            cap.textContent = '';
            cap.hidden = true;
        }
        lastFocus = document.activeElement;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        updateLightboxNav();
        lightbox.querySelector('.carousel-lightbox-close').focus();
    }

    function closeLightbox() {
        if (!lightbox || lightbox.hidden) return;
        resetZoom();
        lightbox.hidden = true;
        document.body.style.overflow = '';
        const img = lightbox.querySelector('.carousel-lightbox-img');
        img.src = '';
        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function bindImage(img, getCaption, navContext) {
        if (img.dataset.lightboxBound) return;
        img.dataset.lightboxBound = '1';
        img.style.cursor = 'zoom-in';
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        const open = () => {
            const caption    = typeof getCaption === 'function' ? getCaption() : (getCaption || '');
            const images     = navContext ? navContext.getImages() : null;
            const startIndex = navContext ? navContext.index : 0;
            openLightbox(img.currentSrc || img.src, img.alt, caption, images, startIndex);
        };
        img.addEventListener('click', open);
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    }

    function addLightboxHint(container) {
        if (container.querySelector('.lightbox-hint')) return;
        container.classList.add('has-lightbox');
        const hint = document.createElement('span');
        hint.className = 'lightbox-hint';
        hint.setAttribute('aria-hidden', 'true');
        hint.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
        container.appendChild(hint);
    }

    function wireLightbox(root) {
        const allImgs = Array.from(root.querySelectorAll('.carousel-media img'));
        allImgs.forEach((img, idx) => {
            const navContext = allImgs.length > 1 ? {
                getImages: () => allImgs.map(i => {
                    const slide  = i.closest('.carousel-slide');
                    const capEl  = slide && slide.querySelector('.carousel-caption p');
                    return { src: i.currentSrc || i.src, alt: i.alt, caption: capEl ? capEl.textContent.trim() : '' };
                }),
                index: idx
            } : null;
            bindImage(img, () => {
                const slide = img.closest('.carousel-slide');
                const capEl = slide && slide.querySelector('.carousel-caption p');
                return capEl ? capEl.textContent.trim() : '';
            }, navContext);
        });
        root.querySelectorAll('.carousel-media').forEach(media => addLightboxHint(media));
    }

    function wireStandaloneLightboxImages() {
        document.querySelectorAll('img.lightbox-img').forEach(img => {
            bindImage(img, img.dataset.lightboxCaption || '');
        });
    }

    function wireImageCards() {
        document.querySelectorAll('.image-card-media').forEach(container => {
            const img = container.querySelector('img');
            if (!img || container.dataset.lightboxBound || 'noLightbox' in container.dataset) return;
            container.dataset.lightboxBound = '1';
            container.setAttribute('role', 'button');
            container.setAttribute('tabindex', '0');
            container.setAttribute('aria-label', 'View image fullscreen');
            addLightboxHint(container);
            const open = () => {
                const figure = container.closest('figure');
                const captionEl = figure && figure.querySelector('.image-card-caption p');
                const caption = captionEl ? captionEl.textContent.trim() : '';
                openLightbox(img.currentSrc || img.src, img.alt, caption);
            };
            container.addEventListener('click', open);
            container.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        });
    }

    function wireInsightCallouts() {
        document.querySelectorAll('.data-callout-media').forEach(container => {
            const img = container.querySelector('img');
            if (!img || container.dataset.lightboxBound || 'noLightbox' in container.dataset) return;
            container.dataset.lightboxBound = '1';
            container.setAttribute('role', 'button');
            container.setAttribute('tabindex', '0');
            container.setAttribute('aria-label', 'View image fullscreen');
            addLightboxHint(container);
            const open = () => {
                const callout = container.closest('.data-callout');
                const capEl = callout && callout.querySelector('.data-callout-statement');
                const caption = capEl ? capEl.textContent.trim() : '';
                openLightbox(img.currentSrc || img.src, img.alt, caption);
            };
            container.addEventListener('click', open);
            container.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        });
    }

    function wireCompareMedia() {
        document.querySelectorAll('.compare-media').forEach(container => {
            const img = container.querySelector('img');
            if (!img || container.dataset.lightboxBound || 'noLightbox' in container.dataset) return;
            container.dataset.lightboxBound = '1';
            container.setAttribute('role', 'button');
            container.setAttribute('tabindex', '0');
            container.setAttribute('aria-label', 'View image fullscreen');
            addLightboxHint(container);
            const open = () => {
                const frame = container.closest('.compare-frame');
                const labelEl = frame && frame.querySelector('.compare-label');
                const caption = labelEl ? labelEl.textContent.trim() : '';
                openLightbox(img.currentSrc || img.src, img.alt, caption);
            };
            container.addEventListener('click', open);
            container.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        });
    }

    function initAll() {
        document.querySelectorAll('[data-carousel]').forEach(root => {
            initCarousel(root);
            wireLightbox(root);
        });
        wireStandaloneLightboxImages();
        wireImageCards();
        wireInsightCallouts();
        wireCompareMedia();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
