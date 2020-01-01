/* Variables de temps */
let timeNow = new Date();
let utcOffset = timeNow.getTimezoneOffset();
timeNow.setMinutes(timeNow.getMinutes() + utcOffset);


/* Exports */
export { timeNow, utcOffset };