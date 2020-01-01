import { convertCurrency } from '../functions/fonctions_principales/convertCurrency_Function.js';
import { isEmptyValue } from '../functions/fonctions_annexes/isEmptyValue_Function.js';

$(function () {
    $("#convertCurrencyForm").submit(() => {
        event.preventDefault();
        let value = $('#value').val();
        const currencyOfTheValue = $("#currencyOfTheValue option:selected").val();
        const currencyAfter = $("#currencyAfter option:selected").val();
        if(isEmptyValue(value) || isNaN(parseFloat(value))) {
            $('.rateDate').html('');
            $('.results').html(emptyMessageError);
        }
        else {
            const url = 'https://api.exchangeratesapi.io/latest?base=' + currencyOfTheValue;
            value = parseFloat(value);
            convertCurrency(value, currencyAfter, url);
        }
    });
});