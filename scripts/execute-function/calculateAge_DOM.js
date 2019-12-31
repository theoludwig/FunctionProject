import { calculateAge } from '../functions/fonctions_principales/calculateAge_Function.js';

$(function () {
    $("#birthDateValue").bind("keyup change", () => {
        $('.results').html(calculateAge($('#birthDateValue').val()));
    });
});