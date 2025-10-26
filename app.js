(function () {
  // --- Chemin de base pour GitHub Pages (adapter si tu renommes le dépôt) ---
  const BASE = '/les-7-cles';

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const titleEl = document.getElementById('puzzleTitle');
  const textEl  = document.getElementById('puzzleText');
  const hintEl  = document.getElementById('hint');
  const formEl  = document.getElementById('answerForm');
  const inputEl = document.getElementById('answer');
  const feedbackEl = document.getElementById('feedback');

  if (!id) {
    // Si on arrive sur puzzle.html sans ?id=..., on renvoie vers l'accueil
    if (window.location.pathname.endsWith('puzzle.html')) {
      window.location.replace(`${BASE}/index.html`);
    }
    return;
  }

  const PUZZLE = (window.PUZZLES || []).find(p => p.id === id);
  if (!PUZZLE) {
    window.location.replace(`${BASE}/index.html`);
    return;
  }

  // Vérifier la progression locale
  const unlocked = JSON.parse(localStorage.getItem('unlocked') || "{}");
  const prevId = previousId(id);
  if (id !== "1" && !unlocked[prevId]) {
    // Pas déverrouillé ? on renvoie à la dernière clé atteinte
    const last = lastUnlocked(unlocked) || "1";
    window.location.replace(`${BASE}/puzzle.html?id=${last}`);
    return;
  }

  // Injecter contenu
  if (titleEl) titleEl.textContent = PUZZLE.title;
  if (textEl)  textEl.textContent  = PUZZLE.riddle;
  if (hintEl)  hintEl.textContent  = PUZZLE.hint || "";

  // Compteur de tentatives (pour afficher hint2 à partir de 2 erreurs si présent)
  const attemptsKey = `attempts_${PUZZLE.id}`;
  let attempts = parseInt(localStorage.getItem(attemptsKey) || "0", 10);

  // Formulaire
  if (formEl) {
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const raw = inputEl.value;
      const val = normalize(raw);
      if (!val) return;

      // --- Mini-contrôle pour la Clé 3 : "coeur/cœur" => indice doux ---
      if (PUZZLE.id === "3") {
        if (val === "coeur" || val === "cœur") {
          if (feedbackEl) feedbackEl.textContent = "Tu y es presque… pense à ce qui réchauffe et que l’on sent sur la peau.";
          incrAttempts();
          maybeShowHint2();
          return;
        }
      }
      // ---------------------------------------------------------------

      const isOk = (PUZZLE.accepted || []).map(normalize).includes(val);

      if (!isOk) {
        if (feedbackEl) feedbackEl.textContent = "Mmmh… ce n’est pas ça. Écoute encore.";
        incrAttempts();
        maybeShowHint2();
        return;
      }

      // Réinitialiser le compteur pour cette clé (réussie)
      localStorage.removeItem(attemptsKey);

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
        window.location.href = `${BASE}/puzzle.html?id=${PUZZLE.next}`;
      } else {
        window.location.href = `${BASE}/success.html`;
      }
    });
  }

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

  function incrAttempts() {
    attempts += 1;
    localStorage.setItem(attemptsKey, String(attempts));
  }

  function maybeShowHint2() {
    // Afficher hint2 à partir de 2 erreurs pour toute clé qui définit PUZZLE.hint2
    if (attempts >= 2 && PUZZLE.hint2) {
      const base = PUZZLE.hint ? PUZZLE.hint : "";
      const combo = base ? `${base} — ${PUZZLE.hint2}` : PUZZLE.hint2;
      if (hintEl && !hintEl.textContent.includes(PUZZLE.hint2)) {
        hintEl.textContent = combo;
      }
    }
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
