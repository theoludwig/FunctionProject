/** 
 * @function randomNumber
 * @description Génère un nombre aléatoire entre un minimum inclus et un maximum inclus. 
 * @param {number} min Nombre Minimum 
 * @param {number} max Nombre Maximum 
 * @returns {number} Nombre aléatoire 
 * @example randomNumber(1, 2) → retourne soit 1 ou 2
 */ 
function randomNumber(min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        return messageError;
    }
}

/* Exports */
export { randomNumber };