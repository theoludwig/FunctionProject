const sendResponse                     = require('../../utils/sendResponse');
const { requiredFields, generalError } = require('../../config/errors');

/** 
 * @description Convertis des °C en °F et l'inverse aussi.
 * @param {Number} degree - Nombre de degrès
 * @param {String} unit - Unité du nombre (°C ou °F)
 * @returns {Object} false si arguments non valides et sinon un objet contenant la string et le nombre résultat
 * @examples convertTemperature(23, '°C') → { resultNumber: 73.4, resultString: "73.4 °F" }
 */
function convertTemperature(degree, unit) {
    let temperatureValue = 0;
    let temperatureUnit;
    if (unit === "°C") {
        temperatureUnit = "°F";
        temperatureValue = ((degree * 9/5) + 32);
    }
    else if (unit === "°F") {
        temperatureUnit = "°C";
        temperatureValue = (degree - 32) * 5/9;
    }
    else {
        return false;
    }
    return {
        resultNumber: temperatureValue,
        resultString: `${temperatureValue} ${temperatureUnit}`
    };
} 

/* OUTPUTS */
exports.convertTemperatureOutput = (res, argsObject) => {
    let { degree, unit } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(degree && unit)) {
        return sendResponse(res, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    degree = parseInt(degree);
    if (isNaN(degree)) {
        return sendResponse(res, { result: "Veuillez rentré un nombre valide.", httpStatus: 400 });
    }

    const result = convertTemperature(degree, unit);
    if (!result) {
        return sendResponse(res, generalError);
    }

    return sendResponse(res, { result }, true);
}