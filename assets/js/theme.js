// Site-wide light/dark theme: shared source of truth for both the header
// toggle button and the Color Palette toggle on style-guide.html. The
// initial theme (before this file loads) is set by an inline bootstrap
// script in each page's <head> to avoid a flash of the wrong theme; this
// file only needs to handle changes after that.
(function () {
    var THEME_KEY = 'theme';

    function get() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function set(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        try {
            localStorage.setItem(THEME_KEY, mode);
        } catch (err) {
            // localStorage unavailable (private mode, etc.) — theme still
            // applies for this page load, just won't persist.
        }
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: mode } }));
    }

    function toggle() {
        set(get() === 'dark' ? 'light' : 'dark');
    }

    window.__theme = { get: get, set: set, toggle: toggle };

    window.addEventListener('storage', function (event) {
        if (event.key === THEME_KEY && event.newValue && event.newValue !== get()) {
            document.documentElement.setAttribute('data-theme', event.newValue);
            document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: event.newValue } }));
        }
    });

    function syncButton(button) {
        var isDark = get() === 'dark';
        button.setAttribute('aria-pressed', String(isDark));
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    function wireHeaderToggle() {
        var button = document.querySelector('.theme-toggle');
        if (!button) return;

        syncButton(button);
        button.addEventListener('click', toggle);
        document.addEventListener('themechange', function () { syncButton(button); });
    }

    if (document.querySelector('.theme-toggle')) {
        wireHeaderToggle();
    } else {
        document.addEventListener('partials:loaded', wireHeaderToggle);
    }
})();
