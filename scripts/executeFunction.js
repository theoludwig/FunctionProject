$(function () {
    /* ÉXECUTION DES FONCTONS */

    // Touche entrer génère un clique sur les classes .btn à part sur la page convertEncoding
    $("body").keydown(function(e){
        if(e.which === 13 && chemin !== '/views/function-views/convertEncoding.php'){
            $(".btn").click();
        }
    });

    $("#submitWeatherRequest").click((event) => {
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


    function showQuote() {
        const randomQuote = getRandomQuote();
        const quote = randomQuote.quote;
        const source = randomQuote.source;
        $('.resultsRandomQuote').html(`<p id="citation">" ${quote} "</p> <p id="auteur"> - ${source} </p>`);    
        $('#twitterLink').attr('href', `https://twitter.com/intent/tweet?text="${quote}" - ${source}&via=Divlo_FR&hashtags=citation,FunctionProject&url=https://function.divlo.fr/views/function-views/randomQuote.php`);
    }

    $("#submitRandomQuote").click(() => {
        showQuote();
    });
    // Affichage d'une citation au chargement de la page 
    showQuote();

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

	$('#formLinkShortener').submit((e) => {
		e.preventDefault();
		const postdata = $('#formLinkShortener').serialize();
		$.ajax({  
			type: 'POST',
			url: '../../php/shortenLink.php', 
			data: postdata,
			success: (text) => {
                try {
                    $(".results").html(JSON.parse(text).message);
                } catch (error) { 
					$(".results").html("URL invalide.");
				}
			}
		});
    });
    
	$('#feedbackForm').submit((e) => {
		e.preventDefault();
		const postdata = $('#feedbackForm').serialize();
		$.ajax({  
			type: 'POST',
			url: '../../php/feedbackForm.php', 
			data: postdata,
            success: (response) => {
                const result = JSON.parse(response);
                $(".results").html(result.message);
                if(result.isSuccess) {
                    $("#feedbackForm")[0].reset();
                }
			}
		});
	});

});