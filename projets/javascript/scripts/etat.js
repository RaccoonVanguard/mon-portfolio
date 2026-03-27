/* ==============================================
   etat.js – État du jeu et références DOM
   Regroupe les variables qui décrivent la partie
   en cours et les pointeurs vers les éléments HTML.
   ============================================== */

/* ── Variables d'état ───────────────────────────
   Ces variables sont modifiées au fil de la partie.
   Elles sont lues et mises à jour par game.js et ui.js. */
let nombreSecret             = 0;       // Le nombre à deviner
let nombreTentatives         = 0;       // Tentatives effectuées
let partieTerminee           = false;   // Vrai si la partie est terminée
let niveauActuel             = "facile"; // Niveau sélectionné par défaut
let historiquePropositions   = [];      // Liste des propositions déjà faites

/* ── Références DOM ─────────────────────────────
   Récupérées une seule fois au chargement pour
   éviter de re-parcourir le DOM à chaque interaction. */
const champProposition   = document.getElementById("champ-proposition");
const boutonDeviner      = document.getElementById("btn-deviner");
const messageRetour      = document.getElementById("message-retour");
const compteurTentatives = document.getElementById("compteur-tentatives");
const scoreActuel        = document.getElementById("score-actuel");
const essaisRestants     = document.getElementById("essais-restants");
const barreProgression   = document.getElementById("barre-progression");
const historiqueListe    = document.getElementById("historique-liste");
const zoneRejouer        = document.getElementById("zone-rejouer");
const infoDifficulte     = document.getElementById("info-difficulte");
const boutonsNiveau      = document.querySelectorAll(".btn-difficulte");