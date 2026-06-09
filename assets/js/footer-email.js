/**
 * Footer email: click to copy, swap tooltip to "Copied" briefly.
 *
 * Uses event delegation on document so it works regardless of when the
 * footer partial is injected by include.js.
 */
(function () {
    const ORIGINAL = 'Copy email';
    const COPIED = 'Copied';
    const RESET_MS = 1500;

    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (_) {
                /* fall through to legacy path */
            }
        }
        // Legacy fallback for non-secure contexts (e.g. file://) or old browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch (_) {
            ok = false;
        }
        document.body.removeChild(ta);
        return ok;
    }

    document.addEventListener('click', async function (e) {
        const trigger = e.target.closest && e.target.closest('.footer-email-trigger');
        if (!trigger) return;

        e.preventDefault();

        const email = trigger.dataset.email || trigger.textContent.trim();
        const tooltipId = trigger.getAttribute('aria-describedby');
        const tooltip = tooltipId ? document.getElementById(tooltipId) : null;

        const ok = await copyToClipboard(email);

        if (tooltip) {
            tooltip.textContent = ok ? COPIED : 'Copy failed';
            if (tooltip._resetTimer) clearTimeout(tooltip._resetTimer);
            tooltip._resetTimer = setTimeout(function () {
                tooltip.textContent = ORIGINAL;
            }, RESET_MS);
        }
    });
})();
