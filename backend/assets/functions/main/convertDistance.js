const sendResponse                     = require('../../utils/sendResponse');
const { requiredFields, generalError } = require('../../config/errors');

const correspondancesDistance = ["pm", null, null, "nm", null, null, "µm", null, null, "mm", "cm", "dm", "m", "dam", "hm", "km", null, null, "Mm", null, null, "Gm", null, null, "Tm"];

/** 
 * @description Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre.
 * @requires {@link correspondancesDistance}
 * @param {Number} firstValue - Le nombre que vous voulez convertir
 * @param {String} unitFirstValue - L'unité du nombre que vous voulez convertir
 * @param {String} unitFinalValue -  L'unité de votre nombre après la conversion
 * @returns {Object|Boolean} → false si arguments non valides et sinon un objet contenant la string et le nombre résultat
 * @examples convertDistance(500, 'cm', 'm') → { resultNumber: 5, resultString: "5 m" }
 */
function convertDistance(firstValue, unitFirstValue, unitFinalValue) {
    const index1 = correspondancesDistance.indexOf(unitFirstValue); 
    const index2 = correspondancesDistance.indexOf(unitFinalValue);
    if (index1 !== -1 && index2 !== -1) {
        const difference = index1 - index2; 
        const result = firstValue * Math.pow(10, difference);
        return {
            resultNumber: result,
            resultString: `${result} ${unitFinalValue}`
        };
    }
    return false;
}

/* OUTPUTS */
exports.convertDistanceOutput = (res, argsObject) => {
    let { number, numberUnit, finalUnit } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(number && numberUnit && finalUnit)) {
        return sendResponse(res, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    number = parseInt(number);
    if (isNaN(number)) {
        return sendResponse(res, { result: "Veuillez rentré un nombre valide.", httpStatus: 400 });
    }

    const result = convertDistance(number, numberUnit, finalUnit);
    if (!result) {
        return sendResponse(res, generalError);
    }

    return sendResponse(res, { result }, true);
}