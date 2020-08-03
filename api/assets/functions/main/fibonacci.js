const errorHandling = require('../../utils/errorHandling')
const { requiredFields } = require('../../config/errors')
const formatNumberResult = require('../secondary/formatNumberResult')

/**
 * @description Calcule les counter premiers nombres de la suite de fibonacci.
 * @param {number} counter
 */
function fibonacci (counter, result = [], a = 0, b = 1) {
  if (counter === 0) {
    return result
  }
  counter--
  result.push(a)
  return fibonacci(counter, result, b, a + b)
}

/* OUTPUTS */
module.exports = ({ res, next }, argsObject) => {
  let { counter } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!(counter)) {
    return errorHandling(next, requiredFields)
  }

  // Si ce n'est pas un nombre
  counter = parseInt(counter)
  if (isNaN(counter)) {
    return errorHandling(next, { message: 'Veuillez rentré un nombre valide.', statusCode: 400 })
  }

  // Si le nombre dépasse LIMIT_COUNTER
  const LIMIT_COUNTER = 51
  if (counter >= LIMIT_COUNTER) {
    return errorHandling(next, { message: `Par souci de performance, vous ne pouvez pas exécuter cette fonction avec un compteur dépassant ${LIMIT_COUNTER - 1}.`, statusCode: 400 })
  }

  const result = fibonacci(counter)
  const resultFormatted = result.map((number) => formatNumberResult(number))
  return res.status(200).json({
    result,
    resultFormatted,
    resultHTML: `<p>Les ${counter} premiers nombres de la suite de fibonacci :<br/> ${resultFormatted.join(', ')}</p>`
  })
}
