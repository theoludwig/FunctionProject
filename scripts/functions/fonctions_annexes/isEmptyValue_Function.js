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

/* Exports */
export { isEmptyValue };