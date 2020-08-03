/**
 * @description Donne la date et l'heure selon l'UTC (Universal Time Coordinated).
 * @param {String} utc Heure de décalage par rapport à l'UTC
 * @returns {Function} → showDateTime(enteredOffset) → Retourne l'exécution de la fonction showDateTime
 * @examples dateTimeUTC('0')
 */
function dateTimeUTC (utc) {
  const timeNow = new Date()
  const utcOffset = timeNow.getTimezoneOffset()
  timeNow.setMinutes(timeNow.getMinutes() + utcOffset)
  const enteredOffset = parseFloat(utc) * 60
  timeNow.setMinutes(timeNow.getMinutes() + enteredOffset)
  return showDateTime(timeNow)
}

/**
 * @description Affiche la date et l'heure (format : dd/mm/yyyy - 00:00:00).
 * @requires {@link fonctions_annexes.js: showDateTime}
 * @param {String} utc Heure de décalage par rapport à l'UTC
 * @returns {Object} Retourne un objet contenant l'année, le mois, le jour, l'heure, les minutes, les secondes et la date formaté
 * @examples dateTimeUTC('0') → dateTimeUTC vous renvoie l'exécution de showDateTime
 */
function showDateTime (timeNow) {
  const year = timeNow.getFullYear()
  const month = ('0' + (timeNow.getMonth() + 1)).slice(-2)
  const day = ('0' + timeNow.getDate()).slice(-2)
  const hour = ('0' + timeNow.getHours()).slice(-2)
  const minute = ('0' + timeNow.getMinutes()).slice(-2)
  const second = ('0' + timeNow.getSeconds()).slice(-2)
  const showDateTimeValue =
    day + '/' + month + '/' + year + ' - ' + hour + ':' + minute + ':' + second
  const objectDateTime = {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    showDateTimeValue: showDateTimeValue
  }
  return objectDateTime
}

module.exports = dateTimeUTC
