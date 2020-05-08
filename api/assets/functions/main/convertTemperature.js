const errorHandling                    = require('../../utils/errorHandling');
const { requiredFields, generalError } = require('../../config/errors');
const formatNumberResult               = require('../secondary/formatNumberResult');

/** 
 * @description Convertis des °C en °F et l'inverse aussi.
 * @param {Number} degree - Nombre de degrès
 * @param {String} unit - Unité du nombre (°C ou °F) après conversion
 * @returns {Object} false si arguments non valides et sinon un objet contenant la string et le nombre résultat
 * @examples convertTemperature(23, '°F') → { result: 73.4, resultHTML: "73.4 °F" }
 */
function convertTemperature(degree, unit) {
    let temperatureValue = 0;
    if (unit === "°C") {
        temperatureValue = (degree - 32) * 5/9;
    }
    else if (unit === "°F") {
        temperatureValue = ((degree * 9/5) + 32);
    }
    else {
        return false;
    }
    return {
        result: temperatureValue,
        resultHTML: `<p>${formatNumberResult(degree)} ${(unit === '°C') ? "°F" : "°C"} = ${formatNumberResult(temperatureValue)} ${unit}</p>`
    };
} 

/* OUTPUTS */
module.exports = convertTemperatureOutput = ({ res, next }, argsObject) => {
    let { degree, unitToConvert } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(degree && unitToConvert)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    degree = parseFloat(degree);
    if (isNaN(degree)) {
        return errorHandling(next, { message: "Veuillez rentré un nombre valide.", statusCode: 400 });
    }

    const result = convertTemperature(degree, unitToConvert);
    if (!result) {
        return errorHandling(next, generalError);
    }

    return res.status(200).json(result);
}