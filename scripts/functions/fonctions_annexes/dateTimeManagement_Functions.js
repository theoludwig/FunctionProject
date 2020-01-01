import { timeNow, utcOffset } from '../../variables/timesVariables.js';

/** 
 * @function dateTimeUTC
 * @description Donne la date et l'heure selon l'UTC (Universal Time Coordinated).
 * @requires {@link fonctions_annexes.js: showDateTime}
 * @requires {@link variables.js: timeNow, utcOffset, timeNow.setMinutes(timeNow.getMinutes() + utcOffset)}
 * @param {string} utc Heure de décalage par rapport à l'UTC 
 * @returns {function} → showDateTime(enteredOffset) → Retourne l'exécution de la fonction showDateTime
 * @example dateTimeUTC('0') 
 */ 
function dateTimeUTC(utc) {
    const enteredOffset = parseFloat(utc)*60;
    timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);
    return showDateTime(enteredOffset);
} 

/** 
 * @function showDateTime
 * @description Affiche la date et l'heure (format : dd/mm/yyyy - 00:00:00).
 * @requires {@link fonctions_annexes.js: showDateTime}
 * @param {string} utc Heure de décalage par rapport à l'UTC 
 * @returns {object} Retourne un objet contenant l'année, le mois, le jour, l'heure, les minutes, les secondes et la date formaté
 * @example dateTimeUTC('0') → dateTimeUTC vous renvoie l'exécution de showDateTime
 */ 
function showDateTime(enteredOffset) {
    const year    = timeNow.getFullYear();
    const month   = ('0'+(timeNow.getMonth()+1)).slice(-2);
    const day     = ('0'+timeNow.getDate()).slice(-2);
    const hour    = ('0'+timeNow.getHours()).slice(-2);
    const minute  = ('0'+timeNow.getMinutes()).slice(-2);
    const second  = ('0'+timeNow.getSeconds()).slice(-2);

    const showDateTimeValue = day + "/" + month + "/" + year + " - " + hour + ":" + minute + ":" + second;
    const objectDateTime = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        showDateTimeValue: showDateTimeValue
    };
    timeNow.setMinutes(timeNow.getMinutes() - enteredOffset)

    return objectDateTime;
}

/* Exports */
export { dateTimeUTC, showDateTime };