const errorHandling      = require('../../utils/errorHandling');
const { requiredFields } = require('../../config/errors');
const formatNumberResult = require('../secondary/formatNumberResult');

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
module.exports = randomNumberOutput = ({ res, next }, argsObject) => {
    let { min, max } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(min && max)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce ne sont pas des nombres
    min = parseInt(min);
    max = parseInt(max);
    if (isNaN(min) || isNaN(max)) {
        return errorHandling(next, { message: "Les paramètres min et max doivent être des nombres...", statusCode: 400 });
    }

    const result = randomNumber(min, max);
    return res.status(200).json({ result, resultHTML: `<p>${formatNumberResult(result)}</p>` });
}