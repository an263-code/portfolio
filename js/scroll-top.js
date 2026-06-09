// Scroll-to-top control for case-study pages.
// Injects a fixed button (mirroring the dot-nav's JS-injected pattern) that
// fades in once the reader has scrolled past the first viewport and glides
// the page back to the top on click.

(function () {
    function init() {
        if (document.querySelector('.scroll-top')) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'scroll-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
            'aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: reduce.matches ? 'auto' : 'smooth'
            });
        });

        document.body.appendChild(btn);

        // Reveal once past the first viewport.
        const threshold = () => window.innerHeight * 0.8;
        let ticking = false;
        const update = () => {
            ticking = false;
            btn.classList.toggle('is-visible', window.scrollY > threshold());
        };
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
