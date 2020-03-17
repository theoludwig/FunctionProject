const sendResponse       = require('../../utils/sendResponse');
const { requiredFields } = require('../../config/errors');
const formatNumberResult = require('../secondary/formatNumberResult');

/** 
 * @description Vérifie si un nombre fait partie des nombres d'Armstrong.
 * @param {Number} number - Le nombre à tester
 * @returns {Object} Un objet contenant l'explication en html et le booléen si oui ou non c'est un nombre d'armstrong
 * @examples armstrongNumber(153) → 153 est un nombre d'Armstrong, car  1<sup>3</sup> + 5<sup>3</sup> + 3<sup>3</sup> = 153.
 */ 
function armstrongNumber(number) {
    let numberString = number.toString();
    let numberStringLength = numberString.length;

    let result = 0;
    let resultString = "";
    for (let index = 0; index < numberStringLength; index++) {
        result = result + parseInt(numberString[index]) ** numberStringLength;
        resultString = resultString + " + " + numberString[index] + "<sup>" + numberStringLength + "</sup>";
    }

    const formattedNumber = formatNumberResult(number);
    const isArmstrongNumber = (result === number); 
    return {
        isArmstrongNumber,
        htmlExplanation: `${formattedNumber} ${isArmstrongNumber ? "" : "n'"}est pas un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`
    }    
}

/* OUTPUTS */
exports.armstrongNumberOutput = (res, argsObject) => {
    let { number } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(number)) {
        return sendResponse(res, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    number = parseInt(number);
    if (isNaN(number) || number <= 0) {
        return sendResponse(res, { result: "Veuillez rentré un nombre valide.", httpStatus: 400 });
    }

    return sendResponse(res, { result: armstrongNumber(number) }, true);
}