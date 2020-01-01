/** 
 * @function convertTemperature
 * @description Convertis des °C en °F et l'inverse aussi.
 * @param {number} degree - Nombre de degrès
 * @param {string} unit - Unité du nombre (°C ou °F)
 * @returns {string} - degree unit = temperatureValue
 * @example convertTemperature(23, '°C') → 23 °C = 73.4 °F
 */
function convertTemperature(degree, unit) {
    if (unit === "°C") {
        const temperatureValue = ((degree * 9/5) + 32) + " °F";
        return degree + " " + unit + " = " + temperatureValue;
    }
    else if (unit === "°F") {
        const temperatureValue = (degree - 32) * 5/9 + " °C";
        return degree + " " + unit + " = " + temperatureValue;
    }
} 

/* Exports */
export { convertTemperature };