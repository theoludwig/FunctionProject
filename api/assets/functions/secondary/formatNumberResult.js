/**
 * @description Formate un nombre avec des espaces.
 * @param {Number} number
 * @param {String} separator Le séparateur utilisé pour la virgule (exemple: "." ou ",")
 * @returns {String} - Le nombre formaté
 * @examples formatNumberResult(76120) → '76 120'
 */
function formatNumberResult (number, separator = '.') {
  const parts = number.toString().split(separator)
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join(separator)
}

module.exports = formatNumberResult
