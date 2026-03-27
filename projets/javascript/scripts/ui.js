/* ==============================================
   ui.js – Fonctions d'affichage
   Toutes les fonctions qui lisent l'état du jeu
   (etat.js) pour mettre à jour ce que l'utilisateur voit.
   Aucune logique métier ici : on affiche, c'est tout.
   ============================================== */

/* ── mettreAJourInterface() ─────────────────────
   Synchronise les compteurs et la barre de progression
   avec l'état actuel de la partie. */
function mettreAJourInterface() {
  const config         = NIVEAUX[niveauActuel];
  const essaisUtilises = nombreTentatives;
  const essaisLeft     = Math.max(config.essaisMax - essaisUtilises, 0);
  const pourcentage    = (essaisUtilises / config.essaisMax) * 100;

  // Compteur de tentatives
  animer(compteurTentatives);
  compteurTentatives.textContent = essaisUtilises;

  // Essais restants
  animer(essaisRestants);
  essaisRestants.textContent = essaisLeft;

  // Barre de progression
  barreProgression.style.width = `${pourcentage}%`;

  // La barre vire au rouge/orange quand il reste peu d'essais
  if (pourcentage >= 75) {
    barreProgression.classList.add("danger");
  } else {
    barreProgression.classList.remove("danger");
  }
}

/* ── afficherMessage() ──────────────────────────
   Met à jour la zone de message avec le texte
   et la classe CSS correspondant au type de retour.
   Types possibles : "trop-petit", "trop-grand",
                     "gagne", "perdu", "attention" */
function afficherMessage(texte, type) {
  // Effacer les classes d'état précédentes
  messageRetour.className = "jeu-message";

  // Forcer un reflow pour relancer l'animation CSS
  void messageRetour.offsetWidth;

  messageRetour.textContent = texte;
  messageRetour.classList.add("visible", type, "animer");
}

/* ── afficherScore() ────────────────────────────
   Met à jour la case "Score" dans les statistiques. */
function afficherScore(points) {
  animer(scoreActuel);
  scoreActuel.textContent = points;
}

/* ── ajouterAHistorique() ───────────────────────
   Crée un élément <li> dans l'historique pour
   la proposition saisie. La couleur finale est
   appliquée ensuite par mettreAJourHistoriqueItem(). */
function ajouterAHistorique(valeur) {
  // Retirer le message "aucune proposition" s'il est encore affiché
  const vide = historiqueListe.querySelector(".jeu-historique-vide");
  if (vide) vide.remove();

  historiquePropositions.push(valeur);

  const item = document.createElement("li");
  item.classList.add("jeu-historique-item");
  item.dataset.valeur = valeur;
  item.textContent    = valeur;
  historiqueListe.appendChild(item);

  // Défilement automatique vers le dernier élément ajouté
  historiqueListe.scrollTop = historiqueListe.scrollHeight;
}

/* ── mettreAJourHistoriqueItem() ────────────────
   Applique la bonne classe de couleur sur le dernier
   item de l'historique après la comparaison.
   Classe attendue : "bas" / "haut" / "exact" */
function mettreAJourHistoriqueItem(valeur, classe) {
  const items = historiqueListe.querySelectorAll(
    `.jeu-historique-item[data-valeur="${valeur}"]`
  );
  if (items.length > 0) {
    items[items.length - 1].classList.add(classe);
  }
}

/* ── reinitialiserAffichage() ───────────────────
   Remet tous les éléments visuels à leur état initial.
   Appelée par reinitialiserJeu() dans game.js. */
function reinitialiserAffichage() {
  compteurTentatives.textContent = "0";
  scoreActuel.textContent        = "–";
  essaisRestants.textContent     = NIVEAUX[niveauActuel].essaisMax;
  barreProgression.style.width   = "0%";
  barreProgression.classList.remove("danger");

  messageRetour.className   = "jeu-message";
  messageRetour.textContent = "";

  historiqueListe.innerHTML =
    `<li class="jeu-historique-vide">Aucune proposition pour l'instant.</li>`;

  zoneRejouer.hidden = true;

  champProposition.value = "";
  champProposition.focus();
}

/* ── animer() ───────────────────────────────────
   Déclenche l'animation CSS "popValeur" sur un élément
   statistique pour signaler visuellement un changement. */
function animer(element) {
  element.classList.remove("animer");
  void element.offsetWidth; // Force le reflow pour relancer l'animation
  element.classList.add("animer");
}

/* ── agiterInput() ──────────────────────────────
   Animation de secousse sur le champ de saisie
   en cas de valeur invalide. */
function agiterInput() {
  champProposition.style.animation = "none";
  void champProposition.offsetWidth;
  champProposition.style.animation = "agiter 0.4s ease";
}