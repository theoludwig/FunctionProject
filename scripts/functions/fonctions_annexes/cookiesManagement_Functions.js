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

/* Exports */
export { createSessionCookie, getCookieValue };