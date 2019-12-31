import { convertTemperature } from '../functions/fonctions_principales/convertTemperature_Function.js';

$(function () {
    $("#convertTemperatureForm").submit((event) => {
        event.preventDefault();
        const temperatureValue = $('#temperatureValue').val();
        const degree = parseFloat(temperatureValue.slice(0, temperatureValue.length - 2));
        const unit = temperatureValue.slice(temperatureValue.length - 2);
        if(isEmptyValue(temperatureValue)) {
            $('.results').html(emptyMessageError);
        }
        else {
            $('.results').html(convertTemperature(degree, unit));
        }
    });
});