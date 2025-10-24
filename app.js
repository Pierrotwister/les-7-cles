(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const titleEl = document.getElementById('puzzleTitle');
  const textEl  = document.getElementById('puzzleText');
  const hintEl  = document.getElementById('hint');
  const formEl  = document.getElementById('answerForm');
  const inputEl = document.getElementById('answer');
  const feedbackEl = document.getElementById('feedback');

  if (!id) {
    // Si on arrive sans id, retour à l’accueil
    if (window.location.pathname.endsWith('puzzle.html')) {
      window.location.replace('index.html');
    }
    return;
  }

  const PUZZLE = (window.PUZZLES || []).find(p => p.id === id);
  if (!PUZZLE) {
    window.location.replace('index.html');
    return;
  }

  // Vérifier la progression locale
  const unlocked = JSON.parse(localStorage.getItem('unlocked') || "{}");
  const prevId = previousId(id);
  if (id !== "1" && !unlocked[prevId]) {
    // Pas déverrouillé ? on renvoie à la dernière clé atteinte
    const last = lastUnlocked(unlocked) || "1";
    window.location.replace(`puzzle.html?id=${last}`);
    return;
  }

  // Injecter contenu
  titleEl.textContent = PUZZLE.title;
  textEl.textContent = PUZZLE.riddle;
  hintEl.textContent = PUZZLE.hint;

  // Formulaire
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const val = normalize(inputEl.value);

    if (!val) return;

    const isOk = PUZZLE.accepted.map(normalize).includes(val);

    if (!isOk) {
      feedbackEl.textContent = "Mmmh… ce n’est pas ça. Écoute encore.";
      return;
    }

    // Marquer déverrouillé
    unlocked[id] = true;
    localStorage.setItem('unlocked', JSON.stringify(unlocked));

    // Envoyer notif (si configurée)
    try {
      await notifyUnlock(PUZZLE);
    } catch (err) {
      // silencieux
    }

    // Aller à la suivante ou à la page de fin
    if (PUZZLE.next) {
      window.location.href = `puzzle.html?id=${PUZZLE.next}`;
    } else {
      window.location.href = `success.html`;
    }
  });

  // Utilitaires
  function normalize(s) {
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function previousId(cur) {
    const n = parseInt(cur, 10);
    return String(Math.max(1, n - 1));
  }

  function lastUnlocked(map) {
    const keys = Object.keys(map).map(Number).sort((a,b)=>a-b);
    if (!keys.length) return null;
    return String(keys[keys.length - 1]);
  }

  async function notifyUnlock(p) {
    // Notifications optionnelles via EmailJS (si configuré dans email-config.js)
    if (!window.EMAILJS_PUBLIC_KEY || !window.EMAILJS_SERVICE_ID || !window.EMAILJS_TEMPLATE_ID) return;

    if (!window.emailjs) {
      // Charger EmailJS à la volée
      await loadEmailJs();
    }

    window.emailjs.init(window.EMAILJS_PUBLIC_KEY);
    const payload = {
      puzzle_id: p.id,
      puzzle_title: p.title,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    };

    return window.emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, payload);
  }

  function loadEmailJs() {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
})();
