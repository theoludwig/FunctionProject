const errorHandling                    = require('../../utils/errorHandling');
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
exports.convertTemperatureOutput = ({ res, next }, argsObject) => {
    let { degree, unit } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(degree && unit)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    degree = parseInt(degree);
    if (isNaN(degree)) {
        return errorHandling(next, { message: "Veuillez rentré un nombre valide.", statusCode: 400 });
    }

    const result = convertTemperature(degree, unit);
    if (!result) {
        return errorHandling(next, generalError);
    }

    return res.status(200).json({ result });
}