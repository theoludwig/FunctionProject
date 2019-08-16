/* LES VARIABLES */

const anneeJulienne = 365.25; // Jours ou 31 557 600 secondes
const uniteAstronomique = 150000000; // en km - Système : Système astronomique d'unités

/* Variables utilisés dans les fonctions */
const messageError = "Vous n'avez pas rentré de valeur valide.";
let timeNow = new Date();
let utcOffset = timeNow.getTimezoneOffset();
timeNow.setMinutes(timeNow.getMinutes() + utcOffset);

// Les Variables de la lumière (en m)
const vitesseLumiere = 299792458; // en m/s - Symbole usuel : c
const secondeLumiere = 299792458; // en m
const minuteLumiere = 17987547480; // en m
const heureLumiere = 1079252848800; // en m
const jourLumiere = 25902068371200; // en m
const anneeLumiere = 9460730472580800; // en m