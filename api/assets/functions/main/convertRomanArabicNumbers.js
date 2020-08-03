const errorHandling = require('../../utils/errorHandling')
const { requiredFields, generalError } = require('../../config/errors')
const formatNumberResult = require('../secondary/formatNumberResult')

/* Variable pour convertRomanArabicNumbers */
const correspondancesRomainArabe = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
]

/**
 * @description Convertis un nombre arabe en nombre romain.
 * @param {number} nombre - Le nombre arabe à convertir
 * @returns {string}
 * @examples convertArabicToRoman(24) → 'XXIV'
 */
function convertArabicToRoman (nombre) {
  // Initialisation de la variable qui va contenir le résultat de la conversion
  let chiffresRomains = ''

  function extraireChiffreRomain (valeurLettre, lettres) {
    while (nombre >= valeurLettre) {
      chiffresRomains = chiffresRomains + lettres
      nombre = nombre - valeurLettre
    }
  }

  correspondancesRomainArabe.forEach(correspondance => {
    extraireChiffreRomain(correspondance[0], correspondance[1])
  })

  return chiffresRomains
}

/**
 * @description Convertis un nombre romain en nombre arabe.
 * @param {string} string - Le nombre romain à convertir
 * @return {number}
 * @example convertRomanToArabic('XXIV') → 24
 */
function convertRomanToArabic (string) {
  let result = 0
  correspondancesRomainArabe.forEach(correspondance => {
    while (string.indexOf(correspondance[1]) === 0) {
      // Ajout de la valeur décimale au résultat
      result += correspondance[0]
      // Supprimer la lettre romaine correspondante du début
      string = string.replace(correspondance[1], '')
    }
  })
  if (string !== '') {
    result = 0
  }
  return result
}

/* OUTPUTS */
const convertRomanToArabicOutput = ({ res, next }, number) => {
  // S'il n'y a pas les champs obligatoire
  if (!number) {
    return errorHandling(next, requiredFields)
  }

  // Formate le paramètre
  number = number.toUpperCase()

  const result = convertRomanToArabic(number)
  if (result === 0) {
    return errorHandling(next, generalError)
  }

  return res
    .status(200)
    .json({
      result,
      resultHTML: `<p><span class="important">${number}</span> s'écrit <span class="important">${result}</span> en chiffres arabes.</p>`
    })
}

const convertArabicToRomanOutput = ({ res, next }, number) => {
  // S'il n'y a pas les champs obligatoire
  if (!number) {
    return errorHandling(next, requiredFields)
  }

  // Si ce n'est pas un nombre
  number = parseInt(number)
  if (isNaN(number)) {
    return errorHandling(next, {
      message: 'Veuillez rentré un nombre valide.',
      statusCode: 400
    })
  }

  const result = convertArabicToRoman(number)
  return res
    .status(200)
    .json({
      result,
      resultHTML: `<p><span class="important">${formatNumberResult(
        number
      )}</span> s'écrit <span class="important">${result}</span> en chiffres romains.</p>`
    })
}

const convertRomanArabicObject = {
  convertRomanToArabicOutput,
  convertArabicToRomanOutput
}
function executeFunction (option, value, { res, next }) {
  return convertRomanArabicObject[option]({ res, next }, value)
}

module.exports = ({ res, next }, argsObject) => {
  const { value, functionName } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!(value && functionName)) {
    return errorHandling(next, requiredFields)
  }

  // Si la fonction n'existe pas
  // eslint-disable-next-line
  if (!convertRomanArabicObject.hasOwnProperty(functionName)) {
    return errorHandling(next, {
      message: "Cette conversion n'existe pas.",
      statusCode: 400
    })
  }

  executeFunction(functionName, value, { res, next })
}
