$(function () {

    /* ÉXECUTION DES FONCTONS */

    // Touche entrer génère un clique sur les classes .btn à part sur la page convertEncoding
    $("body").keydown(function(e){
        if(e.which === 13 && chemin !== '/views/function-views/convertEncoding.php'){
            $(".btn").click();
        }
    });

    $("#submitWeatherRequest").click(() => {
        const city = $('#cityName').val();
        const cityName = city.split(' ').join('+'); 
        if(isEmptyValue(cityName)) {
            $('.results').html(emptyMessageError);
        }
        else {
            createSessionCookie("city", cityName); 
            weatherRequest();
        }
    });

    $("#submitRandomNumber").click(() => {
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

    $("#birthDateValue").bind("keyup change", () => 
    {
        $('.results').html(calculateAge($('#birthDateValue').val()));
    });

    $("#submitConvertTemperature").click(() => 
    {
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

    $("#submitConvertDistance").click(() =>
    {
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

    $("#submitFilterStudents").click(() => 
    {
        const nameEntered = $('#nameEntered').val();
        let filteredLetter = $("#filteredLetter").val();
        if(isEmptyValue(nameEntered) || isEmptyValue(filteredLetter)) {
            $('.results').html(emptyMessageError);
        }
        else if(filteredLetter.length === 1) {
            const students = nameEntered.split(', ');
            filteredLetter = capitalize(filteredLetter);
            $('.results').html(filterStudents(filteredLetter, students));
        }
        else {
            $('.results').html(messageError);
        }
    });

    let randomQuoteClicked;
    $("#submitRandomQuote").click(() => {
        randomQuoteClicked = true;
        $('.resultsRandomQuote').html(getRandomQuote());
    });
    // Affichage d'une citation au chargement de la page
    if (randomQuoteClicked != true && chemin === '/views/function-views/randomQuote.php') {
        $('.resultsRandomQuote').html(getRandomQuote());
    }

    /* Permet d'afficher la liste des citations/proverbes */
    if(chemin === "/views/quote-list.php") {
        window.onload = $('.totalLengthQuote').html('Total de ' + quotes.length + ' citations.');
        let resultat = "";
        for (index in quotes) {
            resultat = resultat + `<tr> <td class="quote-element-list important">${quotes[index]["source"]}</td> <td class="quote-element-list">${quotes[index]["quote"]}</td> </tr>`;
        }
        $(".quote-list").append(resultat);
    }

    $("#submitConvertCurrency").click(() => {
        let value = $('#value').val();
        const currencyOfTheValue = $("#currencyOfTheValue option:selected").val();
        const currencyAfter = $("#currencyAfter option:selected").val();
        if(isEmptyValue(value) || isNaN(parseFloat(value))) {
            $('.results').html(emptyMessageError);
        }
        else {
            const url = 'https://api.exchangeratesapi.io/latest?base=' + currencyOfTheValue;
            value = parseFloat(value);
            convertCurrency(value, currencyAfter, url);
        }
    });

    $("#submitConvertEncoding").click(() => {
        const value = $('#value').val();
        const option = $("#option option:selected").val();
        if(isEmptyValue(value)) {
            $('.results').html(messageError);
        }
        else {
            // Objet qui recense toutes les fonctions de convertEncoding
            const convertEncoding = { decimalToBinary, binaryToDecimal, decimalToHexadecimal, hexadecimalToDecimal, binaryToHexadecimal, hexadecimalToBinary, textToNumberUnicode, numberUnicodeToText, textToBinary, binaryToText, textToHexadecimal, hexadecimalToText };
            try {
                function executionFunction(option, value) {
                    return convertEncoding[option](value)
                }
                $('.results').html(executionFunction(option, value));
            } catch (error) {
                $('.results').html(messageError);
            }
        }
    });

    $("#submitConvertRomanArabicNumbers").click(() => {
        let numbersValue = $('#numbersArabic').val();
        numbersValue = numbersValue.replace(/\s/g,'');
        const convertNumberType = $("#convertNumberType option:selected").text();
        if(isEmptyValue(numbersValue)) {
            $('.results').html(emptyMessageError);
        }
        else if (!isNaN(Number(numbersValue))) { 
            if (convertNumberType === "Nombre Romain") {
                const result = convertArabicToRoman(parseInt(numbersValue));
                let numbersValueFormat = formatNumberResult(numbersValue);
                if (result === messageError || isFloat(numbersValue)) {
                    $('.results').html(messageError);
                } else {
                    $('.results').html(`<b>${numbersValueFormat}</b> s'écrit <b>${result}</b> en chiffres romains.`);
                }
            } else {
                $('.results').html(`<b>${numbersValue}</b> est déjà en chiffres arabes.`);
            }

        }
        else if (convertNumberType === "Nombre Arabe") {
                const result = convertRomanToArabic(numbersValue.toUpperCase());
                if (result === 0) {
                    $('.results').html(messageError);
                } else {
                    $('.results').html(`<b>${numbersValue}</b> s'écrit <b>${formatNumberResult(result)}</b> en chiffres arabes.`);
                }
        }
        else {
            $('.results').html(messageError);
        }
    });

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

    $("#submitHeapAlgorithm").click(() => {
        const value = $('#value').val();
        if(isEmptyValue(value)) {
            $('.results').html(emptyMessageError);
        }
        else {
            const start = new Date();
            const stringPermutationsResult = stringPermutations(value);
            let result = "";
            for (element in stringPermutationsResult) {
                result = result + stringPermutationsResult[element] + "<br>";
            }
            const end = new Date();
            $('.results').html(`Temps d'éxecution du script : ${end - start} ms. <br>Il y a ${formatNumberResult(stringPermutationsResult.length)} possibilités d'anagramme pour le mot "${value}" qui contient ${value.length} caractères, la liste : <br><br> ${result}`);
        }
    });

    if (chemin === "/views/function-views/convertMarkdown.php" && localStorage.getItem('convertedHTML') && localStorage.getItem('texteMarkdown')) {
        $('.results').html(localStorage.getItem('convertedHTML'));
        $('#texteMarkdown').val(localStorage.getItem('texteMarkdown'));
    }

    $("#texteMarkdown").bind("keyup change", () => {
        const textMarkdown = $('#texteMarkdown').val();
        const convertedHTML = marked(textMarkdown);
        localStorage.setItem("convertedHTML", convertedHTML);
        localStorage.setItem("texteMarkdown", textMarkdown);
        $('.results').html(convertedHTML);
    });

    /* Changement du texte accueil (exemples de fonction) */
    if(chemin === "/" || chemin === '/index.php') {
        let index=-1;
        function change() {
            if(index === texteFonctionChange.length-1) {
                index = 0;
            }
            else {
                index++;
            }
            document.getElementById("change").innerHTML = texteFonctionChange[index];
        }
        setInterval(change,10000);
    }

    /* Changement du logo du header selon la largeur de la fenêtre */
    $(window).resize(function() {
        const windowWidth = $(window).width();
        if(windowWidth < 463){
            $('#logo-header').attr('src', '/img/FunctionProject_icon.png');
            $('#logo-header').attr('style', 'display: inline-block;width: 80%;');
            $('.navbar-brand').attr('style', 'width: 30%;');
        }
        else {
            $('#logo-header').attr('src', '/img/FunctionProject_brand-logo.png');
            $('#logo-header').removeAttr('style');
            $('.navbar-brand').removeAttr('style');
        }
    });
    
    /* Permet d'afficher l'heure en temps réel sur le footer */
    window.onload = realDateTime('realDateTime');

    /* Window Scroll Top Button */
    const $btnScrollTop = $('.scroll-top-arrow');
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
        autoclose: false,
        todayHighlight: true
    });

});