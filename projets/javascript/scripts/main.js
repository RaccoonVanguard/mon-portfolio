/* ==============================================
   main.js – Gestion des événements et démarrage
   ============================================== */

/* ── Valider la proposition en appuyant sur "Entrée" ── */
champProposition.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    verifierProposition();
  }
});

/* ── Bouton "Deviner" ── */
boutonDeviner.addEventListener("click", () => {
  verifierProposition();
});

/* ── Bouton "Rejouer" ── */
const boutonRejouer = document.getElementById("btn-rejouer");
boutonRejouer.addEventListener("click", () => {
  reinitialiserJeu();
});

/* ── Boutons de difficulté ── */
boutonsNiveau.forEach(bouton => {
  bouton.addEventListener("click", () => {
    changerNiveau(bouton.dataset.niveau);
  });
});

/* ── Démarrage initial ── */
document.addEventListener("DOMContentLoaded", () => {
  // Le champ est déjà prêt grâce au defer, mais on s'assure du focus
  reinitialiserJeu();
});