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

/* Exports */
export { isValidDate };