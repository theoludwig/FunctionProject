import { formatNumberResult } from '../fonctions_annexes/formatNumberResult_Function.js';

/** 
 * @function armstrongNumber
 * @description Vérifie si un nombre fait partie des nombres d'Armstrong.
 * @param {number} number - Le nombre à tester
 * @returns {string}
 * @example armstrongNumber(153) → 153 est un nombre d'Armstrong, car  1<sup>3</sup> + 5<sup>3</sup> + 3<sup>3</sup> = 153.
 */ 
function armstrongNumber(number) {
    let numberString = number.toString();
    let numberStringLength = numberString.length;

    let result = 0;
    let resultString = "";
    for (let i = 0; i < numberStringLength; i++) {
        result = result + parseInt(numberString[i])**numberStringLength;
        resultString = resultString + " + " + numberString[i] + "<sup>" + numberStringLength + "</sup>";
    }

    const formattedNumber = formatNumberResult(number);
    if (result === number) {
        return `${formattedNumber} est un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    } else {
        return `${formattedNumber} n'est pas un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    }
} 

/* Exports */
export { armstrongNumber };