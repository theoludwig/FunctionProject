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

/* Exports */
export { capitalize };