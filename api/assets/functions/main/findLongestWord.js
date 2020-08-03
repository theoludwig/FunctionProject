const errorHandling = require('../../utils/errorHandling')
const { requiredFields } = require('../../config/errors')

/**
 * @description Renvoie le mot le plus long d'une chaîne de caractères
 * @param {string} string
 * @returns {string}
 * @example findLongestWord('Chaîne de caractères') → 'caractères'
 */
function findLongestWord (string) {
  const arrayString = string.split(' ')
  let stringLength = 0
  let result = ''

  arrayString.forEach((element) => {
    if (element.length > stringLength) {
      result = element
      stringLength = element.length
    }
  })

  return result
}

/* OUTPUTS */
module.exports = ({ res, next }, argsObject) => {
  const { string } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!(string)) {
    return errorHandling(next, requiredFields)
  }

  const result = findLongestWord(string)
  return res.status(200).json({
    result,
    resultHTML: `<p>Le mot le plus long est : <br/>"${result}"</p>`
  })
}
