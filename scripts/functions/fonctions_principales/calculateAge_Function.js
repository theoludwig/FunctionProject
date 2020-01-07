import { formatNumberResult } from '../fonctions_annexes/formatNumberResult_Function.js';
import { isValidDate } from '../fonctions_annexes/isValidDate_Function.js';
import { dateTimeUTC } from '../fonctions_annexes/dateTimeManagement_Functions.js';

/** 
 * @function calculateAge
 * @description Calcule l'âge de quelqu'un selon ça date de naissance.
 * @requires {@link fonctions_annexes.js: formatNumberResult, isValidDate, dateTimeUTC} 
 * @requires {@link main.js: messageError}
 * @requires {@link "external:moment.js"}
 * @see {@link https://momentjs.com/}
 * @param {string} birthDateEntered - Date de naissance (dd/mm/yyyy)
 * @returns {string} - L'âge en jours, mois et années
 * @example calculateAge('31/03/2003')
 */ 
function calculateAge(birthDateEntered) {
    // Les variables de la fonction
    const birthDateDay = parseInt(birthDateEntered.substring(0, 2));
    const birthDateMonth = parseInt((birthDateEntered.substring(3, 5)) - 1);
    const birthDateYear = parseInt(birthDateEntered.substring(6, 10));
    const currentDateObject = dateTimeUTC('0');
    const day = parseInt(currentDateObject.day);
    const month = parseInt(currentDateObject.month - 1);
    const year = parseInt(currentDateObject.year);

    let dateNow = moment([year, month, day]);
    let birthDate = moment([birthDateYear, birthDateMonth, birthDateDay]);

    // Calcule l'âge - Moment.js
    let ageYears = dateNow.diff(birthDate, 'year');
    birthDate.add(ageYears, 'years');
    let ageMonths = dateNow.diff(birthDate, 'months');
    birthDate.add(ageMonths, 'months');
    let ageDays = dateNow.diff(birthDate, 'days');

    const isValidDateFunction = isValidDate(birthDateDay + '/' + birthDateMonth + '/' + birthDateYear, currentDateObject.showDateTimeValue); 

    // Vérifie si la valeur entrée correspond à une date de naissance valide
    if(isValidDateFunction && !isNaN(ageDays)) {
        ageYears = formatNumberResult(ageYears);
        // Si c'est ton anniversaire aujourd'hui
        if(birthDateDay === day && birthDateMonth === month) {
            return 'Vous avez ' + ageYears + ' ans. Joyeux Anniversaire! 🥳';
        }
        else {
            return 'Vous avez ' + ageYears + ' ans, ' + ageMonths + ' mois et ' + ageDays + ' jour(s).';
        }
    }
    else {
        return messageError;
    }  
} 

/* Exports */
export { calculateAge };