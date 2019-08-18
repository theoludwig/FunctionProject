$(function () {

    // Fichiers qui contient les variables 
    $.getScript("/scripts/variables.js", function() {

    // Fichiers qui contient les fonctions
    $.getScript("/scripts/fonctions.js", function() {

    /* ÉXECUTION DES FONCTONS */
    $( "#submitWeatherRequest" ).click(function() 
    {
        let city = $('#cityName').val();
        let cityName = city.split(' ').join('+'); 
        if(isEmptyValue(cityName))
        {
            $('.results').html(emptyMessageError);
            $("#cityName, #submitWeatherRequest").click(function() {
                document.location.replace("../function-views/weatherRequest.php");
            });
        }
        else 
        {
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=fr&units=metric&appid=" + config.APIkey + "";
            weatherRequest(url, 'weather');
        }
    });

    $( "#submitRandomNumber" ).click(function() 
    {
        let minEntered = $('#minValue').val();
        let maxEntered = $('#maxValue').val(); 

        if(isEmptyValue(minEntered) || isEmptyValue(maxEntered))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            let result = randomNumber(minEntered, maxEntered);
            if(result === messageError)
            {
                $('.results').html(messageError);
            }
            else 
            {
                $('.results').html("Nombre aléatoire compris entre " + minEntered + " inclus et " + maxEntered + " inclus : " + result);
            }
        }
    });

    $( "#submitCalculateAge" ).click(function() 
    {
        let birthDateEntered = $('#birthDateValue').val();

        if(isEmptyValue(birthDateEntered))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            let result = calculateAge(birthDateEntered);
            if(result === messageError)
            {
                $('.results').html(messageError);
            }
            else 
            {
                $('.results').html(result);
            }
        }
    });

    $( "#submitConvertTemperature" ).click(function() 
    {
        let temperatureValue = $('#temperatureValue').val();
        let degree = parseFloat(temperatureValue.slice(0, temperatureValue.length - 2));
        let unit = temperatureValue.slice(temperatureValue.length - 2);

        if(isEmptyValue(temperatureValue))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            let result = convertTemperature(degree, unit);
            if(result === messageError)
            {
                $('.results').html(messageError);
            }
            else 
            {
                $('.results').html(degree + " " + unit + " = " + result);
            }
        }
    });

    $( "#submitConvertDistance" ).click(function() 
    {
        let firstValueEntered = $('#firstValue').val();
        let secondValueEntered = $("#secondValue option:selected").text();

        if(isEmptyValue(firstValueEntered) || isEmptyValue(secondValueEntered))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            let firstValue = parseFloat(firstValueEntered.slice(0, firstValueEntered.length - 2));;
            let unitFirstValue = firstValueEntered.slice(firstValueEntered.length - 2);

            let result = convertDistance(firstValue, unitFirstValue, secondValueEntered);
            if(result === messageError)
            {
                $('.results').html(messageError);
            }
            else 
            {
                $('.results').html(result);
            }
        }
    });

    /* Permet d'afficher l'heure en temps réel sur le footer */
    window.onload = realDateTime('realDateTime');

    // Fin de l'import des fonctions
    });
    // Fin de l'import des variables
    });
})