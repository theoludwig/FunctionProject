const errorHandling                    = require('../../utils/errorHandling');
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
exports.convertRomanToArabicOutput = ({ res, next }, argsObject) => {
    let { romanNumber } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(romanNumber)) {
        return errorHandling(next, requiredFields);
    }

    // Formate le paramètre
    try { 
        romanNumber = romanNumber.toUpperCase(); 
    } 
    catch { 
        return errorHandling(next, generalError); 
    }

    const result = convertRomanToArabic(romanNumber);
    if (result === 0) {
        return errorHandling(next, generalError);
    }
        
    return res.status(200).json({ result });
}

exports.convertArabicToRomanOutput = ({ res, next }, argsObject) => {
    let { number } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(number)) {
        return errorHandling(next, requiredFields);
    }
    
    // Si ce n'est pas un nombre
    number = parseInt(number);
    if (isNaN(number)) {
        return errorHandling(next, { message: "Veuillez rentré un nombre valide.", statusCode: 400 });
    }

    return res.status(200).json({ result: convertArabicToRoman(number) });
}