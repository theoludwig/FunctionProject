import { correspondancesRomainArabe } from '../../variables/romanArabicNumbersReference.js';

/** 
 * @function convertArabicToRoman
 * @description Convertis un nombre arabe en nombre romain.
 * @requires {@link variables.js: correspondancesRomainArabe}
 * @param {number} nombre - Le nombre arabe à convertir
 * @returns {string}
 * @example convertArabicToRoman(24) → 'XXIV'
 */
function convertArabicToRoman(nombre) {
    // Initialisation de la variable qui va contenir le résultat de la conversion
    let chiffresRomains = "";

    /* 
        Étapes pour écrire un nombre romain :

        On vérifie quand le nombre arabe est >= à la plus grande valeur possible dans la table de correspondance des nombres romains de haut en bas puis on rajoute la lettre romaine correspondante à la plus grande valeur possible dans la variable chiffresRomains et on soustrait la valeur du chiffre romain qu'on vient d'ajouter au nombre arabe puis on répète l'opération jusqu'à nombre arabe vaut 0...

            Exemple avec 27 :
                27 - X (10) = 17
                17 - X (10) = 7
                7 - V (5) = 2
                2 - I (1) = 1
                1 - I (1) = 0
                XXVII
    */

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
 * @function convertRomanToArabic
 * @description Convertis un nombre romain en nombre arabe.
 * @requires {@link variables.js: correspondancesRomainArabe}
 * @param {string} str - Le nombre romain à convertir
 * @returns {number}
 * @example convertRomanToArabic('XXIV') → 24
 */
function convertRomanToArabic(str) {
    let result = 0;
    for (let i = 0;i < correspondancesRomainArabe.length; i++) {
      while (str.indexOf(correspondancesRomainArabe[i][1]) === 0){
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

/* Exports */
export { convertArabicToRoman, convertRomanToArabic };