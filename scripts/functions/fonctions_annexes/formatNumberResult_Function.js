/** 
 * @function formatNumberResult
 * @description Formate un nombre avec des espaces.
 * @param {number} num
 * @returns {(number|string)} - Le nombre formaté soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example formatNumberResult(76120) → '76 120'
 */ 
function formatNumberResult(num) {
    if(!isNaN(num) && num >= 1000) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
    else {
        return num;
    }
} 

/* Exports */
export { formatNumberResult };