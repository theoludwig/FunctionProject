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

    $("#submitRandomNumber").click(function() 
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

    $("#submitCalculateAge").click(function() 
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

    $("#submitConvertTemperature").click(function() 
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

    $("#submitConvertDistance").click(function() 
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

    $("#submitFilterStudents").click(function() 
    {
        let nameEntered = $('#nameEntered').val();
        let filteredLetter = $("#filteredLetter").val();

        if(isEmptyValue(nameEntered) || isEmptyValue(filteredLetter))
        {
            $('.results').html(emptyMessageError);
        }
        else if(filteredLetter.length === 1)
        {
            let students = nameEntered.split(', ');
            filteredLetter = capitalize(filteredLetter);
            let result = filterStudents(filteredLetter, students);
            $('.results').html(result);
        }
        else {
            $('.results').html(messageError);
        }
    });

    /* Permet d'afficher l'heure en temps réel sur le footer */
    window.onload = realDateTime('realDateTime');

    /* Window Scroll Top Button */
    var $btnScrollTop = $('.scroll-top-arrow');
    $btnScrollTop.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    /* Date Picker */
    $.fn.datepicker.dates['fr'] = {
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    monthsShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
    today: "Aujourd'hui",
    monthsTitle: "Mois",
    clear: "Effacer",
    weekStart: 1,
    format: "dd/mm/yyyy"
    };
    $('.datepicker').datepicker({
    language: 'fr',
    autoclose: true,
    todayHighlight: true
    })

    // Fin de l'import des fonctions
    });
    // Fin de l'import des variables
    });
})