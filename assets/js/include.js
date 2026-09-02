(async function () {
    const slots = document.querySelectorAll('[data-include]');
    await Promise.all(
        Array.from(slots).map(async (slot) => {
            const url = slot.getAttribute('data-include');
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(res.statusText);
                const html = await res.text();
                slot.outerHTML = html;
            } catch (err) {
                console.error(`Failed to load partial: ${url}`, err);
            }
        })
    );

    // On the single-page layout the scroll-spy (section-nav.js) owns the active
    // nav state, so the static data-page mapping is skipped there.
    const page = document.body.dataset.page;
    if (page && !document.body.hasAttribute('data-single-page')) {
        const link = document.querySelector(`.site-nav-link[data-nav="${page}"]`);
        if (link) link.classList.add('active');
    }

    if (window.lucide) lucide.createIcons();

    // Let scripts that depend on the injected header/footer start up.
    document.dispatchEvent(new CustomEvent('partials:loaded'));
})();
