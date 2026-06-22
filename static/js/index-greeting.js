const greetingEl = document.getElementById('intro-greeting');

if (greetingEl) {
  const greetings = [
    'Hi',       // English
    'Olá',      // Portuguese
    'Hola',     // Spanish
    '你好',      // Mandarin Chinese
    'नमस्ते',    // Hindi
    'Bonjour',  // French
    'مرحبا',    // Arabic
    'হ্যালো',   // Bengali
    'Привет',   // Russian
    'سلام'      // Urdu
  ];

  const pauseBetweenWordsMs = 3500;
  const fadeDurationMs = 220;

  function wait(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }

  async function runSubtleGreetingCycle() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let index = 0;
    greetingEl.style.transition = `opacity ${fadeDurationMs}ms ease`;

    while (true) {
      await wait(pauseBetweenWordsMs);
      greetingEl.style.opacity = '0.35';
      await wait(fadeDurationMs);

      index = (index + 1) % greetings.length;
      greetingEl.textContent = greetings[index];
      greetingEl.style.opacity = '1';
      await wait(fadeDurationMs);
    }
  }

  runSubtleGreetingCycle();
}
