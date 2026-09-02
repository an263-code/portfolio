// Color Palette section on style-guide.html: these Light Mode / Dark Mode
// buttons are one of two controls (the header toggle is the other) for the
// same site-wide theme, both backed by window.__theme (assets/js/theme.js).
(function () {
    var section = document.getElementById('color-palette');
    if (!section) return;

    var buttons = section.querySelectorAll('.palette-toggle-btn');

    function syncButtons() {
        var mode = window.__theme.get();
        buttons.forEach(function (btn) {
            var isActive = btn.getAttribute('data-palette-mode') === mode;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            window.__theme.set(button.getAttribute('data-palette-mode'));
        });
    });

    document.addEventListener('themechange', syncButtons);
    syncButtons();
})();
