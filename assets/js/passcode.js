const PASSCODE = 'dp2026';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'portfolio_unlock_ts';

function isUnlocked() {
    const ts = localStorage.getItem(STORAGE_KEY);
    return ts && (Date.now() - Number(ts)) < SESSION_DURATION;
}

function isExpired() {
    const ts = localStorage.getItem(STORAGE_KEY);
    return ts && (Date.now() - Number(ts)) >= SESSION_DURATION;
}

function buildOverlay(expired) {
    const overlay = document.createElement('div');
    overlay.className = 'passcode-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'passcode-heading');

    const iconSvg = expired
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="10" x2="14" y1="2" y2="2"/>
                <line x1="12" x2="15" y1="14" y2="11"/>
                <circle cx="12" cy="14" r="8"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
           </svg>`;

    overlay.innerHTML = `
        <div class="passcode-card">
            <a href="projects.html" class="passcode-back text-link" aria-label="Back to projects">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Projects
            </a>
            <div class="passcode-icon${expired ? ' passcode-icon--expired' : ''}">
                ${iconSvg}
            </div>
            <div>
                <h2 id="passcode-heading">${expired ? 'Session Expired' : 'Protected Project'}</h2>
                <p>${expired ? 'Your access has expired. Please re-enter the passcode.' : 'You can find the passcode on the resume.'}</p>
            </div>
            <div class="passcode-field-group">
                <div class="passcode-input-wrapper">
                    <input
                        class="passcode-input"
                        type="password"
                        id="passcode-input"
                        placeholder="Enter passcode"
                        autocomplete="current-password"
                        aria-label="Passcode"
                    >
                    <button class="passcode-toggle" id="passcode-toggle" type="button" aria-label="Show passcode" tabindex="-1">
                        <svg id="passcode-eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
                <div class="passcode-error" id="passcode-error" aria-live="polite"></div>
            </div>
            <button class="btn btn-primary passcode-submit" id="passcode-submit" disabled>View Project</button>
        </div>
    `;

    return overlay;
}

function showOverlay(expired) {
    const overlay = buildOverlay(expired);
    document.body.appendChild(overlay);
    document.body.classList.add('passcode-active');

    const input = overlay.querySelector('#passcode-input');
    const toggle = overlay.querySelector('#passcode-toggle');
    const eyeIcon = overlay.querySelector('#passcode-eye-icon');
    const submitBtn = overlay.querySelector('#passcode-submit');
    const errorEl = overlay.querySelector('#passcode-error');

    input.focus();

    toggle.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.setAttribute('aria-label', isPassword ? 'Hide passcode' : 'Show passcode');
        eyeIcon.innerHTML = isPassword
            ? `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
               <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
               <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
               <line x1="2" x2="22" y1="2" y2="22"/>`
            : `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
               <circle cx="12" cy="12" r="3"/>`;
    });

    function attempt() {
        if (submitBtn.disabled) return;
        const value = input.value.trim();
        if (value === PASSCODE) {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
            overlay.classList.add('fade-out');
            overlay.addEventListener('transitionend', () => {
                overlay.remove();
                document.body.classList.remove('passcode-active');
            }, { once: true });
        } else {
            errorEl.textContent = 'Incorrect passcode. Please try again.';
            input.classList.add('shake', 'error');
            input.value = '';
            input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
            input.focus();
        }
    }

    submitBtn.addEventListener('click', attempt);
    input.addEventListener('input', () => {
        submitBtn.disabled = input.value.trim() === '';
        if (errorEl.textContent) errorEl.textContent = '';
        input.classList.remove('error');
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') attempt();
    });
}

function init() {
    if (!isUnlocked()) {
        showOverlay(isExpired());
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
