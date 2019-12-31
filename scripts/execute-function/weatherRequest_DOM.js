import { weatherRequest } from '../functions/fonctions_principales/weatherRequest_Function.js';

$(function () {
    $("#weatherForm").submit((event) => {
        event.preventDefault();
        const city = $('#cityName').val();
        const cityName = city.split(' ').join('+');
        const data = `city=${cityName}`; 
        if(isEmptyValue(cityName)) {
            $('.results').html(emptyMessageError);
        }
        else {
            weatherRequest(data);
        }
    });
});