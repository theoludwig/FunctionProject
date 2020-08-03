/**
 * @description Majuscule à la 1ère lettre d'une string.
 * @param {String} s
 * @returns {String}
 * @examples capitalize('hello world!') → 'Hello world!'
 */
function capitalize (s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = capitalize
