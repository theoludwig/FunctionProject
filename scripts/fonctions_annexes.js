/* Fonctions Annexes */

/** 
 * @function isEmptyValue
 * @description Vérifie si une valeur est vide.
 * @param {string} value 
 * @returns {boolean} 
 * @example isEmptyValue(null) → true
 */ 
function isEmptyValue(value) {
    return value === '' || value === null || value === undefined;
} 

/** 
 * @function formatNumberResult
 * @description Formate un nombre avec des espaces.
 * @param {number} num
 * @returns {(number|string)} - Le nombre formaté soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example formatNumberResult(76120) → '76 120'
 */ 
function formatNumberResult(num) {
    if(!isNaN(num) && num >= 1000) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
    else {
        return num;
    }
} 

/** 
 * @function isFloat
 * @description Vérifie si un nombre est un float (integer exclu).
 * @param {number} value 
 * @returns {boolean} 
 * @example isFloat(76120.474) → true
 */
function isFloat(value) {
    return !isNaN(value) && value.toString().includes('.');
} 

/** 
 * @function capitalize
 * @description Majuscule à la 1ère lettre d'une string.
 * @param {string} s 
 * @returns {string} 
 * @example capitalize('hello world!') → 'Hello world!'
 */
function capitalize(s) { 
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

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

/** 
 * @function realDateTime
 * @description Affiche l'heure en temps réel.
 * @param {string} id 
 * @returns {boolean} true → Toujours true
 * @example window.onload = realDateTime('realDateTime') → va afficher l'heure en temps réel au chargement de la page dans la balise avec l'id realDateTime
 */
function realDateTime(id) {
    const realDateTimeNow = new Date;
    // const year    = realDateTimeNow.getFullYear();
    // const month   = ('0'+(realDateTimeNow.getMonth()+1)).slice(-2);
    // const day     = ('0'+realDateTimeNow.getDate()).slice(-2);
    const hour    = ('0'+realDateTimeNow.getHours()).slice(-2);
    const minute  = ('0'+realDateTimeNow.getMinutes()).slice(-2);
    const second  = ('0'+realDateTimeNow.getSeconds()).slice(-2);

    const resultat = hour + ":" + minute + ":" + second;

    document.getElementById(id).innerHTML = resultat;
    setTimeout('realDateTime("'+id+'");','1000');
    return true;
}

/** 
 * @function isValidDate
 * @description Vérifie si une date est valide (si la variable verifyDate a déjà exister avant la variable currentDate).
 * @param {string} verifyDate (format : dd/mm/yyyy) sachant qu'il faut faire -1 au mois car de 0 à 11 donc par exemple 14/12/2019 sera le 14 novembre 2019
 * @param {string} currentDate (format : dd/mm/yyyy) pas besoin de faire -1 au mois donc par exemple 14/12/2019 sera le 14 décembre 2019
 * @returns {boolean}
 * @example 
 * isValidDate('10/11/2019', '11/11/2019') → false → Comparaison entre le 10 décembre 2019 et le 11 novembre 2019
 * isValidDate('10/10/2019', '11/11/2019') → true → Comparison entre le 10 novembre 2019 et le 11 novembre 2019
 */ 
function isValidDate(verifyDate, currentDate) {
    // Date à vérifier 
    const toVerifyDate = verifyDate.split('/');
    const splitedToVerifyDate = toVerifyDate[2] + '-' + (parseInt(toVerifyDate[1]) + 1) + '-' + toVerifyDate[0];
    const msToVerifyDate = Date.parse(splitedToVerifyDate);

    // Date courante
    currentDate = currentDate.substr(0,10);
    const currentDateSplited = currentDate.split('/');
    const currentDateFormat = currentDateSplited[2] + '-' + currentDateSplited[1] + '-' + currentDateSplited[0];
    const msCurrentDate = Date.parse(currentDateFormat);

    if(msToVerifyDate <= msCurrentDate) {
        return true;
    } else if(msToVerifyDate > msCurrentDate) {
        return false;
    } else {
        return messageError;
    }
}

/** 
 * @function createSessionCookie
 * @description Créer un cookie de session.
 * @param {string} name Nom du cookie
 * @param {string} value Valeur du cookie
 */
function createSessionCookie(name, value) { 
    document.cookie = escape(name) + "=" + escape(value) + " ; path=/"; 
} 

/** 
 * @function getCookieValue
 * @description Récupère la valeur d'un cookie.
 * @param {string} name Nom du cookie
 * @param {string} value Valeur du cookie
 */
function getCookieValue(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}