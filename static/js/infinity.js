/* infinity.js — the ∞ / 🔒 vault gate.
 *
 * Triggers: any element with class "vault-trigger".
 *   - .vault-lock-btn      → a 🔒 button shown at the TOP of the page (always visible)
 *   - .infinity-gate       → the ∞ that appears only at the deepest About slider level
 * Clicking any trigger opens a riddle-gated modal. Solve it and the encrypted
 * "full story" (vault-data.js) is decrypted in-browser and revealed in #vault-output.
 *
 * The answer is forgiving: make / build / create / ship + "something people want",
 * with filler words and punctuation ignored. See candidateKeys().
 *
 * Depends on: VaultCrypto (vault-crypto.js) and VAULT (vault-data.js).
 */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var triggers = Array.prototype.slice.call(document.querySelectorAll('.vault-trigger'));
    var output = document.getElementById('vault-output');
    var slider = document.getElementById('info-slider');
    if (!triggers.length || !output || typeof VaultCrypto === 'undefined' || typeof VAULT === 'undefined') return;

    var STORE_KEY = 'jonny.vault.unlocked';

    // floating 🔒 cursor — only for the ∞ gate
    var lockCursor = document.createElement('div');
    lockCursor.className = 'vault-lock-cursor';
    lockCursor.textContent = '🔒';
    lockCursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lockCursor);
    document.addEventListener('mousemove', function (e) {
      if (!lockCursor.classList.contains('is-visible')) return;
      lockCursor.style.left = e.clientX + 'px';
      lockCursor.style.top = e.clientY + 'px';
    });

    function isOpened() { return !output.hidden && output.childNodes.length > 0; }

    triggers.forEach(function (t) {
      if (t.classList.contains('infinity-gate')) {
        t.addEventListener('mouseenter', function () { if (!isOpened()) lockCursor.classList.add('is-visible'); });
        t.addEventListener('mouseleave', function () { lockCursor.classList.remove('is-visible'); });
      }
      t.addEventListener('click', function () { if (!isOpened()) openModal(); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!isOpened()) openModal(); }
      });
    });

    function markOpened() {
      triggers.forEach(function (t) { t.classList.add('is-opened'); t.classList.remove('is-glowing'); });
      lockCursor.classList.remove('is-visible');
    }

    function reveal(text, animate, scroll) {
      markOpened();
      output.innerHTML = '';
      text.split(/\n\s*\n/).forEach(function (p, i) {
        var el = document.createElement('p');
        el.textContent = p.trim();
        if (animate) { el.className = 'vault-line'; el.style.animationDelay = (i * 0.1) + 's'; }
        output.appendChild(el);
      });
      output.hidden = false;
      if (scroll) { try { output.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {} }
    }

    // remembered unlock, this tab session only (we never store the answer)
    var unlocked = false;
    try { unlocked = localStorage.getItem(STORE_KEY) === '1'; } catch (e) {}
    if (unlocked) {
      var cached = null;
      try { cached = sessionStorage.getItem('jonny.vault.text'); } catch (e) {}
      if (cached) reveal(cached, false, false);
    }

    // ---- flexible answer: try several candidate keys from the user's input ----
    var FILLER = { that: 1, the: 1, a: 1, an: 1, your: 1, their: 1, to: 1, of: 1 };
    var VERBS = ['make', 'build', 'create', 'ship', 'made', 'built', 'making', 'building'];
    function candidateKeys(raw) {
      var s = String(raw).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
      var words = s.split(' ').filter(function (w) { return w && !FILLER[w]; });
      var set = {};
      set[words.join('')] = 1;                 // de-fillered, joined
      set[VaultCrypto.normalize(raw)] = 1;     // raw normalized (exact)
      if (words.length) {                      // swap the leading verb for each synonym
        var rest = words.slice(1).join('');
        VERBS.forEach(function (v) { set[v + rest] = 1; });
      }
      return Object.keys(set).filter(Boolean);
    }
    function tryUnlock(raw) {
      var keys = candidateKeys(raw);
      for (var i = 0; i < keys.length; i++) {
        var t = VaultCrypto.decrypt(VAULT.data, keys[i], VAULT.seed);
        if (t !== null) return t;
      }
      return null;
    }

    // ---- modal -------------------------------------------------------------
    var overlay = null;
    function openModal() {
      triggers.forEach(function (t) { if (t.classList.contains('infinity-gate')) t.classList.add('is-glowing'); });
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
        var story = tryUnlock(input.value);
        if (story !== null) {
          try {
            localStorage.setItem(STORE_KEY, '1');
            sessionStorage.setItem('jonny.vault.text', story);
          } catch (err) {}
          closeModal();
          reveal(story, true, true);
        } else {
          errorEl.hidden = false;
          modal.classList.remove('vault-shake');
          void modal.offsetWidth;
          modal.classList.add('vault-shake');
          input.select();
        }
      });

      overlay.querySelector('.vault-close').addEventListener('click', closeModal);
      overlay.querySelector('.vault-hint-toggle').addEventListener('click', function () {
        var h = overlay.querySelector('.vault-hint');
        h.hidden = !h.hidden;
      });
      overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeModal(); });
      document.addEventListener('keydown', escClose);
    }

    function closeModal() {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.classList.remove('vault-modal-open');
      triggers.forEach(function (t) { t.classList.remove('is-glowing'); });
      document.removeEventListener('keydown', escClose);
    }
    function escClose(e) { if (e.key === 'Escape') closeModal(); }

    // ---- depth-gated visibility for the ∞ ---------------------------------
    function syncGate() {
      var atMax = slider ? Number(slider.value) >= Number(slider.max) : true;
      triggers.forEach(function (t) { if (t.hasAttribute('data-depth-gated')) t.hidden = !atMax; });
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
