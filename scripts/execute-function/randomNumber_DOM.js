import { randomNumber } from '../functions/fonctions_principales/randomNumber_Function.js';

$(function () {
    $("#randomNumberForm").submit((event) => {
        event.preventDefault();
        const minEntered = $('#minValue').val();
        const maxEntered = $('#maxValue').val(); 
        if(isEmptyValue(minEntered) || isEmptyValue(maxEntered)) {
            $('.results').html(emptyMessageError);
        }
        else {
            const result = randomNumber(minEntered, maxEntered);
            if(result === messageError) {
                $('.results').html(messageError);
            } else {
                $('.results').html("Nombre aléatoire compris entre " + minEntered + " inclus et " + maxEntered + " inclus : " + formatNumberResult(result));
            } 
        }
    });
});