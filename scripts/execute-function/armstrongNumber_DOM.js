import { armstrongNumber } from '../functions/fonctions_principales/armstrongNumber_Function.js';

$(function () {
    $("#numberToTest").bind("keyup change", () => {
        let numbersValue = $('#numberToTest').val();
        numbersValue = parseInt(numbersValue.replace(/\s/g,''));
        if (!isNaN(numbersValue) && numbersValue >= 0) {  
            $('.results').html(armstrongNumber(numbersValue));
        }
        else {
            $('.results').html(messageError);
        }
    });
});