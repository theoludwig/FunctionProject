import { formatNumberResult } from '../fonctions_annexes/formatNumberResult_Function.js';

/** 
 * @function convertDistance
 * @description Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @param {number} firstValue - Le nombre que vous voulez convertir
 * @param {string} unitFirstValue - L'unité du nombre que vous voulez convertir
 * @param {string} unitFinalValue -  L'unité de votre nombre après la conversion
 * @returns {string} - Conversion de longueur : firstValue unitFirstValue = result
 * @example convertDistance(500, 'cm', 'm') → Conversion de longueur : 500 cm = 5 m
 */
function convertDistance (firstValue, unitFirstValue, unitFinalValue) {

    const reference = ["pm",null,null,"nm",null,null,"µm",null,null,"mm","cm","dm","m","dam","hm","km",null,null,"Mm",null,null,"Gm",null,null,"Tm"];
    const index1 = reference.indexOf(unitFirstValue); 
    const index2 = reference.indexOf(unitFinalValue);

    // Condition qui vérifie si les valeurs entrées sont justes
    if ((index1.toString() && index2.toString()) !== '-1') {
        // Conversion des longueurs : 
        const difference = index1 - index2; 
        const result = firstValue*Math.pow(10,difference);
        return 'Conversion de longueur : ' + formatNumberResult(firstValue).toString() + ' ' + unitFirstValue + ' = ' + formatNumberResult(result) + ' ' + unitFinalValue;
    }
    else {
        return messageError;
    }
} 

/* Exports */
export { convertDistance };