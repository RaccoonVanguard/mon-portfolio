/* ==============================================
   game.js – Logique métier du mini-jeu "Deviner le Nombre"
   ============================================== */

/* ── Génère un nombre secret aléatoire selon le niveau actuel ── */
function genererNombre() {
  const max = NIVEAUX[niveauActuel].max;
  return Math.floor(Math.random() * max) + 1;
}

/* ── Vérifie la proposition de l'utilisateur ── */
function verifierProposition() {
  if (partieTerminee) return;

  const proposition = parseInt(champProposition.value, 10);
  const config = NIVEAUX[niveauActuel];

  // Validation de la saisie
  if (isNaN(proposition) || proposition < 1 || proposition > config.max) {
    afficherMessage(`⚠️ Saisis un nombre entre 1 et ${config.max}.`, "attention");
    agiterInput();
    return;
  }

  nombreTentatives++;
  ajouterAHistorique(proposition);

  if (proposition < nombreSecret) {
    afficherMessage("📉 Trop petit ! Essaie un nombre plus grand.", "trop-petit");
    mettreAJourHistoriqueItem(proposition, "bas");
  } else if (proposition > nombreSecret) {
    afficherMessage("📈 Trop grand ! Essaie un nombre plus petit.", "trop-grand");
    mettreAJourHistoriqueItem(proposition, "haut");
  } else {
    mettreAJourHistoriqueItem(proposition, "exact");
    const points = calculerScore();
    afficherMessage(`🎉 Bravo, tu as gagné ! Le nombre était ${nombreSecret}. Score : ${points} pts`, "gagne");
    afficherScore(points);
    terminerPartie();
  }

  // Vérifie si l'utilisateur a épuisé ses essais
  if (!partieTerminee && nombreTentatives >= config.essaisMax) {
    afficherMessage(`😞 Perdu ! Le nombre secret était ${nombreSecret}.`, "perdu");
    terminerPartie();
  }

  mettreAJourInterface();
  champProposition.value = "";
  champProposition.focus();
}

/* ── Calcule le score selon le nombre de tentatives ── */
function calculerScore() {
  const config = NIVEAUX[niveauActuel];
  const penalite = Math.floor(SCORES_BASE[niveauActuel] / config.essaisMax);
  return Math.max(SCORES_BASE[niveauActuel] - (nombreTentatives - 1) * penalite, 10);
}

/* ── Termine la partie ── */
function terminerPartie() {
  partieTerminee = true;
  champProposition.disabled = true;
  boutonDeviner.disabled = true;
  zoneRejouer.hidden = false;

  boutonsNiveau.forEach(b => b.disabled = true);
}

/* ── Réinitialise le jeu ── */
function reinitialiserJeu() {
  nombreTentatives = 0;
  partieTerminee = false;
  historiquePropositions = [];
  nombreSecret = genererNombre();

  // Réactivation des contrôles
  champProposition.disabled = false;
  boutonDeviner.disabled = false;
  boutonsNiveau.forEach(b => b.disabled = false);

  // Réinitialisation de l'affichage
  reinitialiserAffichage();
}

/* ── Change le niveau et relance une partie ── */
function changerNiveau(niveau) {
  if (!NIVEAUX[niveau]) return;

  niveauActuel = niveau;

  // Styles des boutons
  boutonsNiveau.forEach(b => {
    const estActif = b.dataset.niveau === niveau;
    b.classList.toggle("actif", estActif);
    b.setAttribute("aria-pressed", estActif ? "true" : "false");
  });

  // Texte info
  infoDifficulte.textContent = NIVEAUX[niveau].label;

  reinitialiserJeu();
}