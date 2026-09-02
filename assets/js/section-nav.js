// Anchor nav + scroll-spy for the single-page Home/Projects/About layout.
// The shared partials link to `index.html#<section>` so the same markup works
// from the standalone case-study pages; here those links are rewritten to bare
// fragments so the browser does a same-document jump and CSS
// `scroll-behavior: smooth` (single-page.css) glides to the section.

(function () {
    function init() {
        const links = Array.from(document.querySelectorAll('.site-nav-link[data-nav]'));
        const targets = links
            .map(a => ({ a, id: a.dataset.nav, el: document.getElementById(a.dataset.nav) }))
            .filter(t => t.el);

        // Inert on pages that don't host the sections (case studies, style guide).
        if (targets.length === 0) return;

        const nav = document.querySelector('.site-nav');
        const ids = targets.map(t => t.id);

        // Any link pointing at index.html#<section> — nav, footer, in-page copy —
        // becomes a same-document fragment link, so it scrolls instead of reloading.
        document.querySelectorAll('a[href*="#"]').forEach(a => {
            const [path, hash] = (a.getAttribute('href') || '').split('#');
            if (!hash || !ids.includes(hash)) return;
            if (path && !/^\.?\/?index\.html$/.test(path)) return;
            a.setAttribute('href', '#' + hash);
            a.addEventListener('click', () => {
                if (nav) nav.classList.remove('open');   // close the mobile menu
            });
        });

        const headerH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height'), 10) || 64;

        let activeId = null;
        const setActive = id => {
            if (id === activeId) return;
            activeId = id;
            targets.forEach(({ a, id: targetId }) => {
                const on = targetId === id;
                a.classList.toggle('active', on);
                if (on) a.setAttribute('aria-current', 'page');
                else a.removeAttribute('aria-current');
            });
            // Reflect the section in the URL without stacking history entries.
            if (history.replaceState) history.replaceState(null, '', '#' + id);
        };

        // Scan-line scrollspy, same technique as the case-study dot rail
        // (assets/js/dot-nav.js): the active section is the last one whose top
        // has crossed a line set ~35% into the post-header viewport, so the nav
        // flips when the new section's content actually enters view.
        let ticking = false;
        const update = () => {
            ticking = false;

            // Bottom-of-page guard: the footer sits below the last section, so
            // its top may never cross the scanline — without this the previous
            // item would stay active at the very end of the page.
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActive(targets[targets.length - 1].id);
                return;
            }

            const scanline = headerH + (window.innerHeight - headerH) * 0.35;
            let current = targets[0].id;
            for (const t of targets) {
                if (t.el.getBoundingClientRect().top <= scanline) current = t.id;
                else break;
            }
            setActive(current);
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        // Deep links (index.html#about, a bookmark, a reload) are jumped to by
        // the browser before the async header partial and the section images have
        // landed, so the target ends up tens or hundreds of pixels off. Re-align
        // once the layout settles — unless the reader has already taken over.
        const hashId = location.hash.slice(1);
        if (ids.includes(hashId)) {
            let userScrolled = false;
            const noteUserScroll = () => { userScrolled = true; };
            ['wheel', 'touchstart', 'keydown'].forEach(evt =>
                window.addEventListener(evt, noteUserScroll, { passive: true, once: true }));

            const realign = () => {
                if (userScrolled) return;
                document.getElementById(hashId)
                    .scrollIntoView({ behavior: 'instant', block: 'start' });
                update();
            };
            realign();
            window.addEventListener('load', () => requestAnimationFrame(realign), { once: true });
        }

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        window.addEventListener('hashchange', onScroll);
        window.addEventListener('load', onScroll);
    }

    // The header arrives asynchronously via include.js.
    if (document.querySelector('.site-nav-link')) init();
    else document.addEventListener('partials:loaded', init, { once: true });
})();
