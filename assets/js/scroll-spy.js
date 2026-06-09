// Sidebar collapse + scroll-spy for pages that use the .sidebar / .nested-link pattern.
// Generic over which sections to observe — derived from the sidebar's link hrefs.

window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('collapsed');
};

(function () {
    function init() {
        const links = document.querySelectorAll('.nested-link');
        if (links.length === 0) return;

        const byId = {};
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const id = href.slice(1);
            byId[id] = link;
        });

        const sections = Object.keys(byId)
            .map(id => document.getElementById(id))
            .filter(Boolean);

        if (!('IntersectionObserver' in window) || sections.length === 0) return;

        const activeLabel = document.querySelector('.sidebar-active-label');
        const mobileToggle = document.querySelector('.sidebar-mobile-toggle');
        const sidebarEl = document.getElementById('sidebar');

        if (mobileToggle && sidebarEl) {
            mobileToggle.addEventListener('click', () => {
                const expanded = sidebarEl.classList.toggle('expanded');
                mobileToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            });
            links.forEach(l => {
                l.addEventListener('click', () => {
                    sidebarEl.classList.remove('expanded');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        const setActive = id => {
            links.forEach(l => l.classList.remove('active'));
            if (byId[id]) {
                byId[id].classList.add('active');
                if (activeLabel) activeLabel.textContent = byId[id].textContent.trim();
            }
        };

        const observer = new IntersectionObserver(entries => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) setActive(visible[0].target.id);
        }, {
            rootMargin: '-80px 0px -60% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        sections.forEach(s => observer.observe(s));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
