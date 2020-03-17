const sendResponse                     = require('../../utils/sendResponse');
const { requiredFields, generalError } = require('../../config/errors');

/* Variable pour convertRomanArabicNumbers */
const correspondancesRomainArabe = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
];

/** 
 * @description Convertis un nombre arabe en nombre romain.
 * @requires {@link correspondancesRomainArabe}
 * @param {Number} nombre - Le nombre arabe à convertir
 * @returns {String}
 * @examples convertArabicToRoman(24) → 'XXIV'
 */
function convertArabicToRoman(nombre) {
    // Initialisation de la variable qui va contenir le résultat de la conversion
    let chiffresRomains = "";

    function extraireChiffreRomain(valeurLettre, lettres) {
        while (nombre >= valeurLettre) {
            chiffresRomains = chiffresRomains + lettres;
            nombre = nombre - valeurLettre;
        }
    }

    correspondancesRomainArabe.forEach(correspondance => {
        extraireChiffreRomain(correspondance[0], correspondance[1]);
    });

    return chiffresRomains;
} 

/** 
 * @description Convertis un nombre romain en nombre arabe.
 * @requires {@link correspondancesRomainArabe}
 * @param {String} str - Le nombre romain à convertir
 * @returns {Number}
 * @examples convertRomanToArabic('XXIV') → 24
 */
function convertRomanToArabic(str) {
    let result = 0;
    for (let i = 0;i < correspondancesRomainArabe.length; i++) {
        while (str.indexOf(correspondancesRomainArabe[i][1]) === 0) {
            // Ajout de la valeur décimale au résultat
            result += correspondancesRomainArabe[i][0];
            // Supprimer la lettre romaine correspondante du début
            str = str.replace(correspondancesRomainArabe[i][1],'');
        }
    }
    if (str != '') {
        result = 0;
    }
    return result;
} 

/* OUTPUTS */
exports.convertRomanToArabicOutput = (res, argsObject) => {
    let { romanNumber } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(romanNumber)) {
        return sendResponse(res, requiredFields);
    }

    // Formate le paramètre
    try { 
        romanNumber = romanNumber.toUpperCase(); 
    } 
    catch { 
        return sendResponse(res, generalError); 
    }

    const result = convertRomanToArabic(romanNumber);
    if (result === 0) {
        return sendResponse(res, generalError);
    }
        
    return sendResponse(res, { result, httpStatus: 200 }, true);
}

exports.convertArabicToRomanOutput = (res, argsObject) => {
    let { number } = argsObject;
    number = parseInt(number);

    // S'il n'y a pas les champs obligatoire
    if (!(number)) {
        return sendResponse(res, requiredFields);
    }

    // Si ce n'est pas un nombre
    if (isNaN(number)) {
        return sendResponse(res, { result: "Veuillez rentré un nombre valide.", httpStatus: 400 });
    }

    return sendResponse(res, { result: convertArabicToRoman(number) }, true);
}