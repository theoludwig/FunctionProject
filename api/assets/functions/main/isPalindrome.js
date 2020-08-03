const errorHandling = require('../../utils/errorHandling')
const { requiredFields } = require('../../config/errors')

/**
 * @description Inverse la chaîne de caractère
 * @param {string} string
 * @returns {string}
 * @example reverseString('Hello') → 'olleH'
 */
function reverseString (string) {
  return string.split('').reverse().join('')
}

/**
 * @description Vérifie si un mot est un palindrome (un mot qui peut s'écrire dans les deux sens)
 * @requires reverseString
 * @param {string} string
 * @param {string} reverseStringResult La chaîne de caractères inversée
 * @returns {boolean}
 * @example isPalindrome('kayak') → true
 */
function isPalindrome (string, reverseStringResult) {
  return string === reverseStringResult
}

/* OUTPUTS */
module.exports = ({ res, next }, argsObject) => {
  let { string } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!(string)) {
    return errorHandling(next, requiredFields)
  }

  if (typeof string !== 'string') {
    return errorHandling(next, { message: 'Vous devez rentré une chaîne de caractère valide.', statusCode: 400 })
  }

  string = string.toLowerCase()

  const reverseStringResult = reverseString(string)
  const isPalindromeResult = isPalindrome(string, reverseStringResult)
  return res.status(200).json({
    isPalindrome: isPalindromeResult,
    reverseString: reverseStringResult,
    resultHTML: `<p>"${string}" ${(isPalindromeResult) ? 'est' : "n'est pas"} un palindrome car <br/> "${string}" ${(isPalindromeResult) ? '===' : '!=='} "${reverseStringResult}"</p>`
  })
}
