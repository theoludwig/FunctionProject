import { formatNumberResult } from '../fonctions_annexes/formatNumberResult_Function.js';
import { correspondancesMonnaie } from '../../variables/currencyReference.js';

/** 
 * @function convertCurrency
 * @description Convertis une valeur dans une devise dans une autre devise grâce à l'API exchangeratesapi.io.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @requires {@link variables.js: correspondancesMonnaie}
 * @see {@link https://jquery.com/} Requête en AJAX avec jQuery
 * @see {@link https://api.exchangeratesapi.io/} API de taux de change
 * @param {number} value - la valeur à convertir
 * @param {string} currency - la devise à avoir après conversion
 * @param {string} url - l'url de la requête à l'API en fonction du paramètre dans l'url '?base='
 * @example convertCurrency(50, "$ Américain", "https://api.exchangeratesapi.io/latest?base=EUR") 
 * Ajoute au DOM de la page dans la div .results et .rateDate :
 * 50 EUR = 55.17 $ Américain
 * Dernier rafraîchissement du taux d'échange : 08/11/2019
 */ 
function convertCurrency(value, currency, url) {
    function currencyTest(currencyToTest) {
      for (let index in correspondancesMonnaie) {
        if(currencyToTest === correspondancesMonnaie[index]['currency']) {
          return correspondancesMonnaie[index]['symbol'];
        }
        continue;
      }
    }
    $.ajax({
        url : url,
        dataType : "json",
        success: function (jsonFixer) { 
            try {
              let currencySymboleAPI = eval(`jsonFixer.rates.${currencyTest(currency)}`);
              if (currencySymboleAPI === undefined) {
                currencySymboleAPI = 1;
              } 
              $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + formatNumberResult((currencySymboleAPI * value).toFixed(2)) + ' ' + currency);
              $('.rateDate').html(`Dernier rafraîchissement du taux d'échange : ${jsonFixer.date[8] + jsonFixer.date[9]}/${jsonFixer.date[5] + jsonFixer.date[6]}/${jsonFixer.date[0] + jsonFixer.date[1] + jsonFixer.date[2] + jsonFixer.date[3]}`);
            } 
            catch (error) {
                $('.results').html(messageError);
            }
        }
    });
}

/* Exports */
export { convertCurrency };