const errorHandling      = require('../../utils/errorHandling');
const { requiredFields } = require('../../config/errors');
const formatNumberResult = require('../secondary/formatNumberResult');

/** 
 * @description Retourne un tableau contenant toutes les possibilités d'anagramme d'un mot.
 * @param {String} string - La chaîne de caractère à permuter
 * @returns {Array}
 * @examples heapAlgorithm('abc') → ["abc", "acb", "bac", "bca", "cab", "cba"]
 */
function heapAlgorithm(string) {
    let results = [];

    if (string.length === 1) {
        results.push(string);
        return results;
    }

    for (let indexString = 0; indexString < string.length; indexString++) {
        const firstChar = string[indexString];
        const charsLeft = string.substring(0, indexString) + string.substring(indexString + 1);
        const innerPermutations = heapAlgorithm(charsLeft);
        for (let indexPermutation = 0; indexPermutation < innerPermutations.length; indexPermutation++) {
            results.push(firstChar + innerPermutations[indexPermutation]);
        }
    }
    return results;
} 

/* OUTPUTS */
exports.heapAlgorithmOutput = ({ res, next }, argsObject) => {
    let { string } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(string)) {
        return errorHandling(next, requiredFields);
    }

    // Si la chaîne de caractère dépasse LIMIT_CHARACTERS caractères
    const LIMIT_CHARACTERS = 7;
    if (string.length > LIMIT_CHARACTERS) {
        return errorHandling(next, { message: `Par souci de performance, vous ne pouvez pas exécuter cette fonction avec un mot dépassant ${LIMIT_CHARACTERS} caractères.`, statusCode: 400 });
    }

    const result = heapAlgorithm(string);
    let resultHTML = `<p>Il y a ${formatNumberResult(result.length)} possibilités d'anagramme pour le mot "${string}" qui contient ${string.length} caractères, la liste : <br/><br/>`;
    result.forEach((string) => {
        resultHTML += string + "<br/>";
    });
    resultHTML += "</p>";
    return res.status(200).json({ result, resultHTML });
}