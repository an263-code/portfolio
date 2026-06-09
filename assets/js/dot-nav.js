// Desktop-only dot rail with scroll-snap navigation for case-study pages.
// Reads section list from the existing .nested-link sidebar so it stays in sync
// with the mobile dropdown driven by scroll-spy.js.

(function () {
    const mq = window.matchMedia('(min-width: 901px)');
    let cleanup = null;

    function init() {
        if (!mq.matches) { teardown(); return; }
        if (cleanup) return;

        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const links = Array.from(sidebar.querySelectorAll('.nested-link'));
        const targets = links
            .map(a => {
                const href = a.getAttribute('href') || '';
                const id = href.startsWith('#') ? href.slice(1) : '';
                return { a, id, el: id ? document.getElementById(id) : null };
            })
            .filter(o => o.el);

        if (!targets.length) return;

        document.body.setAttribute('data-dot-nav', '');

        const rail = document.createElement('nav');
        rail.className = 'dot-nav';
        rail.setAttribute('aria-label', 'Section navigation');

        targets.forEach(({ a, id, el }, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'dot-nav__btn';
            btn.dataset.target = id;
            const labelText = a.textContent.trim() || (el.querySelector('h1, h2') || {}).textContent?.trim() || '';
            btn.setAttribute('aria-label', labelText);
            if (i === 0) btn.setAttribute('aria-current', 'true');

            const label = document.createElement('span');
            label.className = 'dot-nav__label';
            label.textContent = labelText;
            btn.appendChild(label);

            btn.addEventListener('click', () => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            rail.appendChild(btn);
        });

        document.body.appendChild(rail);

        const headerH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height'), 10) || 64;

        const setActive = id => {
            rail.querySelectorAll('.dot-nav__btn').forEach(b => {
                if (b.dataset.target === id) b.setAttribute('aria-current', 'true');
                else b.removeAttribute('aria-current');
            });
        };

        // Scan-line scrollspy: the active section is the last one whose top
        // has crossed the snap line (scroll-padding-top). Aligning the
        // scanline to headerH exactly — rather than a few px below — makes
        // the dot flip precisely at the scroll-snap boundary.
        let ticking = false;
        const update = () => {
            ticking = false;

            // Bottom-of-page guard: a short trailing section (e.g. #next-step)
            // may never have its top cross the scanline, so the previous dot
            // would stay active even when the user is scrolled to the end.
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActive(targets[targets.length - 1].id);
                return;
            }

            // Scanline sits ~35% into the post-header viewport. Section
            // padding-top (spacing-2xl) means a section's element top edge
            // is well above its visible content; using headerH alone would
            // require near-perfect snap before the dot updates. A scanline
            // inside the content area flips the dot when the new section's
            // content actually enters view.
            const scanline = headerH + (window.innerHeight - headerH) * 0.35;
            let activeId = targets[0].id;
            for (const t of targets) {
                if (t.el.getBoundingClientRect().top <= scanline) {
                    activeId = t.id;
                } else {
                    break;
                }
            }
            setActive(activeId);
        };
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        cleanup = () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            rail.remove();
            document.body.removeAttribute('data-dot-nav');
            cleanup = null;
        };
    }

    function teardown() { if (cleanup) cleanup(); }

    function reinit() { teardown(); init(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    if (mq.addEventListener) mq.addEventListener('change', reinit);
    else if (mq.addListener) mq.addListener(reinit);
})();
