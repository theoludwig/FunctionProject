/////////////////////////////////////////////////////////////////
/* Fonctions Principales */

// Requête à l'API openweathermap.org
function weatherRequest(url) {
        $.ajax({
            url : url,
            dataType : "json",
            success: function (json) { 
                let city = json.name;
                let showDateTimeValue = timeZone(json);
                if(city === 'Moscou')
                {
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/place/${city}/' class="yellow-color" target="_blank">${city}, RU</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                    $("#cityName, #submitWeatherRequest").click(function() {
                        document.location.replace("../../views/function-views/weatherRequest.php");
                    });
                }
                else
                {
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/place/${city}/' class="yellow-color" target="_blank">${city}, ${json.sys.country}</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                    $("#cityName, #submitWeatherRequest").click(function() {
                        document.location.replace("../../views/function-views/weatherRequest.php");
                    });
                }
            },
            statusCode: {
                404: function() { 
                    document.location.replace("../error404Weather");
                }
            }
        });
}

// Génère un nombre aléatoire entre un minimum inclus et un maximum inclus 
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (!isNaN(min) && !isNaN(max) && min < max)
    {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        return null;
    }
}

// Calcule l'âge de quelqu'un selon la date de naissance
function calculateAge(birthDateEntered) {

    // Les variables de la fonction
    let birthDateDay = parseInt(birthDateEntered[0] + birthDateEntered[1]);
    let birthDateMonth = parseInt((birthDateEntered[3] + birthDateEntered[4]) - 1);
    let birthDateYear = parseInt(birthDateEntered[6] + birthDateEntered[7] + birthDateEntered[8] + birthDateEntered[9]);
    dateTimeUTC('0');
    day = parseInt(day)
    month = parseInt(month - 1);
    year = parseInt(year);

    let dateNow = moment([year, month, day]);
    let birthDate = moment([birthDateYear, birthDateMonth, birthDateDay]);

    // Calcule l'âge - Moment.js
    let ageYears = dateNow.diff(birthDate, 'year');
    birthDate.add(ageYears, 'years');
    
    let ageMonths = dateNow.diff(birthDate, 'months');
    birthDate.add(ageMonths, 'months');
    
    let ageDays = dateNow.diff(birthDate, 'days');

    // Vérifie si la valeur entrée correspond à une date de naissance valide
    if(birthDate._isValid === true)
    {
        // Si c'est ton anniversaire aujourd'hui
        if(birthDateDay === parseInt(day) && birthDateMonth === parseInt(month))
        {
            return 'Vous avez ' + ageYears + ' ans. Joyeux Anniversaire! 🥳';
        }
        else
        {
            return 'Vous avez ' + ageYears + ' ans, ' + ageMonths + ' mois et ' + ageDays + ' jour(s).';
        }
    }
    else 
    {
        return messageError;
    }
}

// Convertis des °C en °F et l'inverse aussi
function convertTemperature(degree, unit) {
    if (!isNaN(degree) && unit === "°C") 
    {
        const temperatureValue = ((degree * 9/5) + 32) + " °F";
        return temperatureValue;
    }
    else if (!isNaN(degree) && unit === "°F")
    {
        const temperatureValue = (degree - 32) * 5/9 + " °C";
        return temperatureValue;
    }
    else 
    {
        return messageError; 
    }
}

// Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre
function convertDistance (firstValue, unitFirstValue, unitFinalValue) {

    let reference = ["pm",null,null,"nm",null,null,"µm",null,null,"mm","cm","dm","m","dam","hm","km",null,null,"Mm",null,null,"Gm",null,null,"Tm"];
    let index1 = reference.indexOf(unitFirstValue); 
    let index2 = reference.indexOf(unitFinalValue);

    // Condition qui vérifie si les valeurs entrées sont justes
    if (!isNaN(firstValue) && typeof unitFirstValue === 'string' && typeof unitFinalValue === 'string' && (index1.toString() && index2.toString()) != '-1')
    {
        // Conversion des longueurs : 
        let difference = index1 - index2; 
        let result = firstValue*Math.pow(10,difference);
        let response = 'Conversion de longueur : ' + formatNumberResult(firstValue).toString() + ' ' + unitFirstValue + ' = ' + formatNumberResult(result) + ' ' + unitFinalValue;
        return response;
    }
    else
    {
        return messageError;
    }
}

// Affiche uniquement les prénoms (qui sont dans la liste) qui commence par la lettre souhaitée
function filterStudents(filteredLetter, students)
{
    let filteredStudents = [];
    for(let i = 0; i < students.length; i++)
    {
        let studentBoucle = capitalize(students[i]);
        if (studentBoucle[0] === filteredLetter) {
            filteredStudents.push(studentBoucle);
        }
    }
    if (filteredStudents.length === 1)
    {
        return ("Prénom qui commence par " + filteredLetter + " : " + filteredStudents + '.');
    }
    else if (filteredStudents.length >= 2)
    {
        // Affiche la liste des prénoms...
        let last = filteredStudents[filteredStudents.length - 1]; // Accéde au dernier élément du tableau
        let totalfilteredLetterStudents = filteredStudents.length;
        filteredStudents.pop(); // Supprime le dernier élément du tableau
        // filteredStudents.join(', ') permet de rajouter un espace entre chaque élément du tableau
        return ("Prénoms qui commence par " + filteredLetter + " (" + totalfilteredLetterStudents + ") : " + filteredStudents.join(', ') + ' et ' + last + '.');
    }
    else
    {
        return ("Il n'y a pas de prénom commencant par " + filteredLetter + ".");
    }
}

// Génère aléatoirement une citation ou un proverbe
function getRandomQuote() {
    let randomNbr = randomNumber(0, (quotes.length - 1));
    let randomQuotes = quotes[randomNbr];
    return  '" ' + randomQuotes["quote"] + ' " <br> <br> - ' + randomQuotes["source"];
}

// Convertis des euros (€) dans une autre devise 
function convertCurrency(currency, euroValue) {
    $.ajax({
        url : 'https://api.exchangeratesapi.io/latest',
        dataType : "json",
        success: function (jsonFixer) { 
            switch(currency) {
                case '£':
                    $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.GBP) * euroValue)).toFixed(2) + ' ' + currency);
                    break;
                case '$ Américain':
                    $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.USD) * euroValue)).toFixed(2) + ' ' + currency);
                    break;
                case '$ Canadien':
                            $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.CAD) * euroValue)).toFixed(2) + ' ' + currency);
                            break;
                case '$ Australien':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.AUD) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                case '$ Mexicain':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.MXN) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                case 'Fr':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.CHF) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                case '₽':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.RUB) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                case 'R$':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.BRL) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                case '¥':
                        $('.results').html(formatNumberResult(euroValue) + ' € = ' + ((parseFloat(jsonFixer.rates.JPY) * euroValue)).toFixed(2) + ' ' + currency);
                        break;
                default:
                    $('.results').html(formatNumberResult(euroValue) + ' €');
                    break;
            }
        },
        statusCode: {
            404: function() { 
                document.location.replace("../404.php");
            }
        }
    });
}

// Convertis du texte (encodé en UTF-8) en binaire et l'inverse aussi (source : http://jsfiddle.net/47zwb41o)
// UTF-8 vers Binaire
function utf8ToBin(s) {
    try {
        s = unescape( encodeURIComponent(s));
        var chr, i = 0, l = s.length, out = '';
        for( ; i < l; i ++ ){
            chr = s.charCodeAt( i ).toString(2);
            while(chr.length % 8 != 0 ){ chr = '0' + chr; }
            out += chr;
        }
        return out;
    } catch (error) {
        return s;
    }
}
// Binaire vers UTF-8
function binToUtf8(s){
    try {
        var i = 0, l = s.length, chr, out = '';
        for( ; i < l; i += 8){
            chr = parseInt( s.substr(i, 8 ), 2).toString(16);
            out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
        }
        return decodeURIComponent(out);
    } catch (error) {
        return s;
    }
}

/////////////////////////////////////////////////////////////////
/* Fonctions Annexes */

// Vérifie si une valeur est vide
function isEmptyValue(value) {
    if (value === '' || value === null || value === undefined) {
        return true
    } 
    else {
        return false
    }
}

// Formate les nombres avec des espaces (ex : 76120 = 76 120)
function formatNumberResult(num) {
    if (!isNaN(num))
    {
        if(num >= 1000)
        {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        }
        else
        {
            return num;
        }
    }
    else 
    {
        return messageError;
    }
}

// Convertit les puissances de 10 en nombre (ex: 1e+20 = 100 000 000 000 000 000 000), ne peut pas dépasser 1e+20 (21 ne fonctionne pas)
function convertPuissanceToNumber(num) {
    if(!isNaN(num))
    {
        let number = formatNumberResult((num).toFixed(0));
        return number;
    }
    else
    {
        return messageError;
    }
}

// Majuscule à la 1ère lettre d'une string
function capitalize (s) { 
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// Donne la date et l'heure selon l'UTC (Universal Time Coordinated)
function dateTimeUTC(utc) {
    if(typeof utc === 'string' && utc.length >= 1 && utc[0] === '-' || '0' || '+' || !isNaN(parseFloat(utc[0])))
    {   
        if (utc[0] === '0' && utc.length === 1)
        {   
            let enteredOffset = 0;
            return showDateTime(enteredOffset);
        }
        else if (utc[0] === '+' || !isNaN(parseFloat(utc[0])))
        {
            if (utc.length === 2 && utc[0] === '+')
            {
                // Entered offset
                let enteredOffset = parseFloat(utc[1])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);
                return showDateTime(enteredOffset);
            }
            else if (utc.length === 3 && utc[0] === '+')
            {
                // Entered offset
                let enteredOffset = parseFloat(utc[1] + utc[2])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);
                return showDateTime(enteredOffset);
            }
            else if (utc.length === 1 && !isNaN(parseFloat(utc[0])))
            {
                // Entered offset
                let enteredOffset = parseFloat(utc[0])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);
                return showDateTime(enteredOffset);
            }
            else if (utc.length === 2 && !isNaN(parseFloat(utc[0])))
            {
                // Entered offset
                let enteredOffset = parseFloat(utc[0] + utc[1])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);
                return showDateTime(enteredOffset);
            }
            else
            {
                let enteredOffset = 0;
                return showDateTime(enteredOffset);
            }
        }
        else if (utc[0] === '-')
        {
            if (utc.length === 2 && utc[0] === '-')
            {
                // Entered offset
                let enteredOffset = - parseFloat(utc[1])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);   
                return showDateTime(enteredOffset);
            }
            else if (utc.length === 3 && utc[0] === '-')
            {
                // Entered offset
                let enteredOffset = - parseFloat(utc[1] + utc[2])*60;
                timeNow.setMinutes(timeNow.getMinutes() + enteredOffset);   
                return showDateTime(enteredOffset);
            }
            else
            {
                let enteredOffset = 0;
                return showDateTime(enteredOffset);
            }
        }
        else 
        {
            let enteredOffset = 0;
            return showDateTime(enteredOffset);
        }
    }
    else if (utc === '' || !utc || utc === undefined)
    {
        utc = false;
        let enteredOffset = 0;
        return showDateTime(enteredOffset);
    }
    else
    {
        let enteredOffset = 0;
        return showDateTime(enteredOffset);
    }
}

// Affiche la date et l'heure (format : dd/mm/yyyy - 00:00:00)
function showDateTime(enteredOffset) {
    year    = timeNow.getFullYear();
    month   = ('0'+(timeNow.getMonth()+1)).slice(-2);
    day     = ('0'+timeNow.getDate()).slice(-2);
    hour    = ('0'+timeNow.getHours()).slice(-2);
    minute  = ('0'+timeNow.getMinutes()).slice(-2);
    second  = ('0'+timeNow.getSeconds()).slice(-2);
    
    showDateTimeValue = day + "/" + month + "/" + year + " - " + hour + ":" + minute + ":" + second;
    timeNow.setMinutes(timeNow.getMinutes() - enteredOffset)

    return showDateTimeValue;
}

// Affiche l'heure en temps réel
function realDateTime(id)
{
    realDateTimeNow = new Date;
    year    = realDateTimeNow.getFullYear();
    month   = ('0'+(realDateTimeNow.getMonth()+1)).slice(-2);
    day     = ('0'+realDateTimeNow.getDate()).slice(-2);
    hour    = ('0'+realDateTimeNow.getHours()).slice(-2);
    minute  = ('0'+realDateTimeNow.getMinutes()).slice(-2);
    second  = ('0'+realDateTimeNow.getSeconds()).slice(-2);

    resultat = hour + ":" + minute + ":" + second;

    document.getElementById(id).innerHTML = resultat;
    setTimeout('realDateTime("'+id+'");','1000');
    return true;
}

// Récupére le décalage en secondes à partir de l'heure UTC grâce à l'API
function timeZone(json) {
    if(json.name === 'Moscou') // Il faut ajouter + 1h de décallage à Moscou
    {
        timeZoneValue = (json.timezone / 60 / 60) + 1;
    }
    else
    {
        timeZoneValue = json.timezone / 60 / 60;
    }
    let timeZoneStr = timeZoneValue.toString();
    return dateTimeUTC(timeZoneStr); 
}