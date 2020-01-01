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

/* Exports */
export { isFloat };