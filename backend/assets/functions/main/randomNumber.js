const sendResponse       = require('../../utils/sendResponse');
const { requiredFields } = require('../../config/errors');

/** 
 * @description Génère un nombre aléatoire entre un minimum inclus et un maximum inclus. 
 * @param {Number} min Nombre Minimum 
 * @param {Number} max Nombre Maximum 
 * @returns {Number} Nombre aléatoire 
 * @examples randomNumber(1, 2) → retourne soit 1 ou 2
 */ 
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

/* OUTPUTS */
exports.randomNumberOutput = (res, argsObject) => {
    let { min, max } = argsObject;
    min = parseInt(min);
    max = parseInt(max);

    // S'il n'y a pas les champs obligatoire
    if (!(min && max)) {
        return sendResponse(res, requiredFields);
    }

    // Si ce n'est pas des nombres
    if (isNaN(min) || isNaN(max)) {
        return sendResponse(res, { result: "Les paramètres min et max doivent être des nombres...", httpStatus: 400 });
    }

    return sendResponse(res, { result: randomNumber(min, max) }, true);
}