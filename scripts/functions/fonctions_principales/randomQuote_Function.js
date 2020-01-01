import { randomNumber } from './randomNumber_Function.js';
import { quotes } from '../../variables/listQuotes.js';

/** 
 * @function randomQuote
 * @description Génère aléatoirement une citation ou un proverbe.
 * @requires {@link variables.js: quotes}
 * @requires {@link fonctions_principales.js: randomNumber}
 * @returns {object} - une citation au hasard à partir de la constante 'quotes' dans variables.js
 * @example getRandomQuote() → { quote: "Ne fais jamais rien contre ta conscience, même si l'Etat te le demande.", source: "Albert Einstein" }
 */
function randomQuote() {
    return quotes[randomNumber(0, (quotes.length - 1))];
} 

/* Exports */
export { randomQuote };