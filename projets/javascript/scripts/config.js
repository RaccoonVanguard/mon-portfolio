/* ==============================================
   config.js – Configuration du jeu
   Contient uniquement les constantes immuables.
   Si les règles du jeu changent, c'est ici qu'on touche.
   ============================================== */

/* Définition des niveaux de difficulté.
   Chaque niveau précise :
   - max       : borne supérieure du nombre secret
   - essaisMax : nombre de tentatives autorisées
   - label     : texte affiché sous les boutons de difficulté */
const NIVEAUX = {
  facile: {
    max: 50,
    essaisMax: 15,
    label: "1 à 50 · 15 essais max"
  },
  moyen: {
    max: 100,
    essaisMax: 10,
    label: "1 à 100 · 10 essais max"
  },
  difficile: {
    max: 200,
    essaisMax: 7,
    label: "1 à 200 · 7 essais max"
  }
};

/* Score de base attribué selon le niveau.
   Plus le niveau est difficile, plus le gain potentiel est élevé. */
const SCORES_BASE = {
  facile: 100,
  moyen: 200,
  difficile: 400
};