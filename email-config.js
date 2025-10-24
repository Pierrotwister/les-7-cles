// --------------------------------------------------------
// Configuration EmailJS pour le "Jeu des 7 clés"
// --------------------------------------------------------

// Pour activer les notifications, renseigne les 3 valeurs ci-dessous.
// Ces clés ne permettent AUCUNE action sensible : elles sont publiques.

window.EMAILJS_PUBLIC_KEY  = "QxrbnTrOdkevpQR0h";   // ← ta clé publique
window.EMAILJS_SERVICE_ID  = "service_45nppfp";     // ← ton Service ID exact
window.EMAILJS_TEMPLATE_ID = "template_m49xxnx";    // ← ton Template ID exact

// --------------------------------------------------------
// Fonction de notification réutilisable
// --------------------------------------------------------

window.notifyPuzzleOpen = async function (puzzleId, puzzleTitle) {
  if (!window.EMAILJS_PUBLIC_KEY) {
    console.warn("Notifications EmailJS désactivées (clé publique absente).");
    return;
  }

  const params = {
    puzzle_id: puzzleId,
    puzzle_title: puzzleTitle,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
  };

  try {
    await emailjs.send(
      window.EMAILJS_SERVICE_ID,
      window.EMAILJS_TEMPLATE_ID,
      params,
      window.EMAILJS_PUBLIC_KEY
    );
    console.log(`✅ Notification envoyée : ${puzzleTitle}`);
  } catch (err) {
    console.error("❌ Erreur d'envoi EmailJS :", err);
  }
};
