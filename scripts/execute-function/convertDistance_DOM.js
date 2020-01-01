import { convertDistance } from '../functions/fonctions_principales/convertDistance_Function.js';
import { isEmptyValue } from '../functions/fonctions_annexes/isEmptyValue_Function.js';

$(function () {
    $("#convertDistanceForm").submit((event) => {
        event.preventDefault();
        let firstValue = $('#firstValue').val();
        const unitFirstValue = $("#firstValueUnit option:selected").text();
        const secondValue = $("#secondValue option:selected").text();
        if(isEmptyValue(firstValue) || isEmptyValue(secondValue)) {
            $('.results').html(emptyMessageError);
        }
        else {
            firstValue = parseFloat(firstValue.replace(/\s/g,''));
            $('.results').html(convertDistance(firstValue, unitFirstValue, secondValue));
        }
    });
});