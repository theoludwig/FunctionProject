const errorHandling = require('../../utils/errorHandling')
const { requiredFields } = require('../../config/errors')
const formatNumberResult = require('../secondary/formatNumberResult')

function minNumber (array) {
  let minNumber = { index: 0, value: array[0] }
  for (let index = 1; index < array.length; index++) {
    const number = array[index]
    if (number < minNumber.value) {
      minNumber = { index: index, value: array[index] }
    }
  }
  return minNumber
}

function sortArray (array) {
  const arrayDuplicated = [...array]
  const resultArray = []
  while (array.length !== resultArray.length) {
    const min = minNumber(arrayDuplicated)
    resultArray.push(min.value)
    arrayDuplicated.splice(min.index, 1)
  }
  return resultArray
}

/* OUTPUTS */
module.exports = ({ res, next }, argsObject) => {
  const { numbersList } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!numbersList) {
    return errorHandling(next, requiredFields)
  }

  const numbersListArray = numbersList
    .split(',')
    .map(number => number.trim().replace(' ', ''))
    .map(Number)

  // Si ce n'est pas une liste de nombres
  if (numbersListArray.includes(NaN)) {
    return errorHandling(next, {
      message:
        'Vous devez rentrer une liste de nombres séparée par des virgules valide.',
      statusCode: 400
    })
  }

  // Si la taille du tableau dépasse LIMIT_ARRAY_LENGTH
  const LIMIT_ARRAY_LENGTH = 31
  if (numbersListArray.length >= LIMIT_ARRAY_LENGTH) {
    return errorHandling(next, {
      message: `Par souci de performance, vous ne pouvez pas exécuter cette fonction avec une liste de nombres dépassant ${LIMIT_ARRAY_LENGTH -
        1} nombres.`,
      statusCode: 400
    })
  }

  const result = sortArray(numbersListArray)
  const resultFormatted = result.map(number => formatNumberResult(number))
  return res.status(200).json({
    result,
    resultFormatted,
    resultHTML: `<p>La liste de nombres dans l'ordre croissant :<br/> ${resultFormatted.join(
      ', '
    )}</p>`
  })
}
