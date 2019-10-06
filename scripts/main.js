$(function () {

    /* ÉXECUTION DES FONCTONS */

    $( "#submitWeatherRequest" ).click(function() 
    {
        let city = $('#cityName').val();
        let cityName = city.split(' ').join('+'); 
        if(isEmptyValue(cityName))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            createSessionCookie("city", cityName); 
            weatherRequest();
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
            if(result === messageError) {
                $('.results').html(messageError);
            } else {
                $('.results').html("Nombre aléatoire compris entre " + minEntered + " inclus et " + maxEntered + " inclus : " + formatNumberResult(result));
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
        let firstValue = $('#firstValue').val();
        let unitFirstValue = $("#firstValueUnit option:selected").text();
        let secondValue = $("#secondValue option:selected").text();

        if(isEmptyValue(firstValue) || isEmptyValue(secondValue))
        {
            $('.results').html(emptyMessageError);
        }
        else 
        {
            firstValue = parseFloat(firstValue.replace(/\s/g,''));
            let result = convertDistance(firstValue, unitFirstValue, secondValue);
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

    let randomQuoteClicked;
    $("#submitRandomQuote").click(function() 
    {
        randomQuoteClicked = true;
        $('.resultsRandomQuote').html(getRandomQuote());
    });
    // Affichage d'une citation au chargement de la page
    if (randomQuoteClicked != true && window.location.href.indexOf("randomQuote") > -1) {
        $('.resultsRandomQuote').html(getRandomQuote());
    }

    /* Permet d'afficher la liste des citations/proverbes */
    if(chemin === "/views/quote-list.php") {
        window.onload = $('.totalLengthQuote').html('Total de ' + quotes.length + ' citations.');
        let resultat = "";
        for (index in quotes) {
            resultat = resultat + `<tr> <td class="quote-element-list important">${quotes[index]["source"]}</td> <td class="quote-element-list">${quotes[index]["quote"]}</td> </tr>`;
        }
        $( ".quote-list" ).append(resultat);
    }

    $("#submitConvertCurrency").click(function() 
    {
        let value = $('#value').val();
        let currencyOfTheValue = $("#currencyOfTheValue option:selected").val();
        let currencyAfter = $("#currencyAfter option:selected").val();
        if(isEmptyValue(value) || isNaN(parseFloat(value)))
        {
            $('.results').html(emptyMessageError);
            $("#value, #submitConvertCurrency").click(function() {
                document.location.replace("../function-views/convertCurrency.php");
            });
        }
        else 
        {
            let url = 'https://api.exchangeratesapi.io/latest?base=' + currencyOfTheValue;
            value = parseFloat(value);
            convertCurrency(value, currencyAfter, url);
        }
    });

    $("#submitConvertEncoding").click(function() 
    {
        let value = $('#value').val();
        let option = $("#option option:selected").val();
        if(isEmptyValue(value))
        {
            $('.results').html(messageError);
        }
        else 
        {
          if (option === 'DecimalToBinary' || option === 'BinaryToDecimal' || option === 'DecimalToHexadecimal' || option === 'HexadecimalToDecimal' || option === 'BinaryToHexadecimal' || option === 'HexadecimalToBinary') {
            let result = convertDecimalBinaryHexadecimal(value, option);
            if (result === messageError) {
              $('.results').html(messageError);
            } else {
              $('.results').html(result);
            }
          }
          else if (option === 'BinaryToText') {
            // Le replace enlève les espaces
            let textResult = binToUtf8(value.replace(/\s/g,'')); 
  
            $('.results').html(textResult);
          }
          else if (option === 'TextToBinary') {
              // Les 2 replace permettent de rajouter un espace tout les 8 bits
              let binaryResult = utf8ToBin(value);
              binaryResult = binaryResult.replace(/(\d{8})/g, '$1 ').replace(/(^\s+|\s+$)/,''); 
  
              $('.results').html(binaryResult);
          }
          else if (option === 'TextToHexadecimal') {
            let result = utf8ToHex(value);
            $('.results').html(result.toUpperCase());
          }
          else if (option === 'HexadecimalToText') {
              let result = hexToUtf8(value.replace(/\s/g,''));
              $('.results').html(result);
          }
          else {
            $('.results').html(messageError);
          }
        }
    });

    $("#submitConvertRomanArabicNumbers").click(function() 
    {
        let numbersValue = $('#numbersArabic').val();
        let convertNumberType = $("#convertNumberType option:selected").text();

        if(isEmptyValue(numbersValue)) {
            $('.results').html(emptyMessageError);
        }
        else if (!isNaN(parseInt(numbersValue)) && convertNumberType === "Nombre Romain") { 
            let result = convertArabicToRoman(parseInt(numbersValue.replace(/\s/g,'')));
            let numbersValueFormat = formatNumberResult(numbersValue.replace(/\s/g,''));
            if (numbersValueFormat === messageError || result === messageError) {
                $('.results').html(messageError);
            } else {
                $('.results').html(`<b>${numbersValueFormat}</b> s'écrit <b>${result}</b> en chiffres romains.`);
            }
        }
        else if (convertNumberType === "Nombre Arabe") {
            if (!isNaN(Number(numbersValue))) {
                $('.results').html(`<b>${numbersValue}</b> est déjà en chiffres arabes.`);
            } else {
                numbersValue = numbersValue.toUpperCase();
                let result = convertRomanToArabic(numbersValue);
                if (result === 0) {
                    $('.results').html(messageError);
                } else {
                    $('.results').html(`<b>${numbersValue}</b> s'écrit <b>${result}</b> en chiffres arabes.`);
                }
            }
        }
        else {
            $('.results').html(messageError);
        }
    });

    $("#submitArmstrongNumber").click(function() 
    {
        let numbersValue = $('#numberToTest').val();

        if(isEmptyValue(numbersValue)) {
            $('.results').html(emptyMessageError);
        }
        else if (!isNaN(parseInt(numbersValue))) { 
            let result = armstrongNumber(parseFloat(numbersValue.replace(/\s/g,''))); 
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

})