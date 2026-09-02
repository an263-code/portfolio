// Style Guide only: toggles the Color Palette section between its
// light-mode and dark-mode card sets. Scoped entirely to #color-palette —
// no theme class is ever applied to <body>, so production pages are
// unaffected.
(function () {
    var section = document.getElementById('color-palette');
    if (!section) return;

    var buttons = section.querySelectorAll('.palette-toggle-btn');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var mode = button.getAttribute('data-palette-mode');

            section.classList.toggle('is-dark-preview', mode === 'dark');

            buttons.forEach(function (btn) {
                var isActive = btn === button;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });
        });
    });
})();
