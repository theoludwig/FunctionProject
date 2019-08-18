/* LES VARIABLES */

/* Messages d'erreur */
const emptyMessageError = "Vous ne pouvez pas rentré de valeur vide.";
const messageError = "Vous n'avez pas rentré de valeur valide.";

/* Varibales pour les fonctions */
let timeNow = new Date();
let utcOffset = timeNow.getTimezoneOffset();
timeNow.setMinutes(timeNow.getMinutes() + utcOffset);