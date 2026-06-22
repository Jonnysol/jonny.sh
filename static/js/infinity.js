/* infinity.js — the ∞ gate.
 *
 * Shows up only when the About slider is dragged all the way to the back
 * ("I have time..."). Hovering it swaps the cursor for a 🔒. Clicking it glows
 * and asks for a password — which is a riddle. Solve the riddle and the
 * encrypted "full, full, full story" (vault-data.js) is decrypted in-browser
 * and revealed. Get it wrong and nothing leaks.
 *
 * Depends on: VaultCrypto (vault-crypto.js) and VAULT (vault-data.js).
 */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var slider = document.getElementById('info-slider');
    var gate = document.getElementById('infinity-gate');
    var output = document.getElementById('vault-output');
    if (!gate || typeof VaultCrypto === 'undefined' || typeof VAULT === 'undefined') return;

    var STORE_KEY = 'jonny.vault.unlocked';
    var unlocked = false;
    try { unlocked = localStorage.getItem(STORE_KEY) === '1'; } catch (e) {}

    // ---- floating 🔒 cursor ------------------------------------------------
    var lockCursor = document.createElement('div');
    lockCursor.className = 'vault-lock-cursor';
    lockCursor.textContent = '🔒';
    lockCursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lockCursor);

    gate.addEventListener('mouseenter', function () {
      if (gate.classList.contains('is-opened')) return;
      lockCursor.classList.add('is-visible');
    });
    gate.addEventListener('mouseleave', function () {
      lockCursor.classList.remove('is-visible');
    });
    document.addEventListener('mousemove', function (e) {
      if (!lockCursor.classList.contains('is-visible')) return;
      lockCursor.style.left = e.clientX + 'px';
      lockCursor.style.top = e.clientY + 'px';
    });

    // ---- reveal the decrypted story ---------------------------------------
    function reveal(text, animate) {
      lockCursor.classList.remove('is-visible');
      gate.classList.add('is-opened');
      output.innerHTML = '';
      var paras = text.split(/\n\s*\n/);
      paras.forEach(function (p, i) {
        var el = document.createElement('p');
        el.textContent = p.trim();
        if (animate) {
          el.className = 'vault-line';
          el.style.animationDelay = (i * 0.12) + 's';
        }
        output.appendChild(el);
      });
      output.hidden = false;
    }

    // We never store the password. On a remembered unlock we re-show the text
    // we cached for this tab session; if the tab was closed, the gate asks again.
    if (unlocked) {
      var cached = null;
      try { cached = sessionStorage.getItem('jonny.vault.text'); } catch (e) {}
      if (cached) reveal(cached, false);
    }

    // ---- the password modal -----------------------------------------------
    var overlay = null;
    function openModal() {
      if (gate.classList.contains('is-opened')) return;
      gate.classList.add('is-glowing');
      lockCursor.classList.remove('is-visible');

      overlay = document.createElement('div');
      overlay.className = 'vault-modal-overlay';
      overlay.innerHTML =
        '<div class="vault-modal" role="dialog" aria-modal="true" aria-label="The full story">' +
          '<button class="vault-close" aria-label="Close">×</button>' +
          '<h2 class="vault-modal-title">You really want to know the full, full, full, full story?</h2>' +
          '<p class="vault-modal-sub">Please put in a password.</p>' +
          '<p class="vault-riddle">' + escapeHtml(VAULT.riddle) + '</p>' +
          '<form class="vault-form">' +
            '<input type="text" class="vault-input" autocomplete="off" autocapitalize="off" ' +
              'spellcheck="false" placeholder="the answer…" aria-label="Password" />' +
            '<button type="submit" class="vault-submit">Unlock</button>' +
          '</form>' +
          '<p class="vault-error" hidden>Not quite. The door stays shut.</p>' +
          '<button class="vault-hint-toggle" type="button">need a hint?</button>' +
          '<p class="vault-hint" hidden>' + escapeHtml(VAULT.hint || '') + '</p>' +
        '</div>';
      document.body.appendChild(overlay);
      document.body.classList.add('vault-modal-open');

      var input = overlay.querySelector('.vault-input');
      var form = overlay.querySelector('.vault-form');
      var errorEl = overlay.querySelector('.vault-error');
      var modal = overlay.querySelector('.vault-modal');
      setTimeout(function () { input.focus(); }, 50);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var attempt = VaultCrypto.decrypt(VAULT.data, input.value, VAULT.seed);
        if (attempt !== null) {
          try {
            localStorage.setItem(STORE_KEY, '1');
            sessionStorage.setItem('jonny.vault.text', attempt);
          } catch (err) {}
          closeModal();
          reveal(attempt, true);
        } else {
          errorEl.hidden = false;
          modal.classList.remove('vault-shake');
          void modal.offsetWidth; // restart animation
          modal.classList.add('vault-shake');
          input.select();
        }
      });

      overlay.querySelector('.vault-close').addEventListener('click', closeModal);
      overlay.querySelector('.vault-hint-toggle').addEventListener('click', function () {
        var h = overlay.querySelector('.vault-hint');
        h.hidden = !h.hidden;
      });
      overlay.addEventListener('mousedown', function (e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', escClose);
    }

    function closeModal() {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.classList.remove('vault-modal-open');
      gate.classList.remove('is-glowing');
      document.removeEventListener('keydown', escClose);
    }
    function escClose(e) { if (e.key === 'Escape') closeModal(); }

    gate.addEventListener('click', function () {
      if (gate.classList.contains('is-opened')) return;
      openModal();
    });
    gate.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
    });

    // ---- show/hide the gate with the deepest slider level -----------------
    function syncGate() {
      if (!slider) { gate.hidden = false; return; }
      var atMax = Number(slider.value) >= Number(slider.max);
      gate.hidden = !atMax;
      if (!atMax && overlay) closeModal();
    }
    if (slider) slider.addEventListener('input', syncGate);
    syncGate();

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
  });
})();
