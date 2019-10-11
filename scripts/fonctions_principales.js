/* Fonctions Principales */

// Affiche la météo et l'heure local selon la ville.
function weatherRequest() {
    $.ajax({
        url: '/php/getWeatherJson.php', 
        type: "POST",
            success: function(data) {
                try {
                    let json = jQuery.parseJSON(data);
                    let city = json.name;
                    let showDateTimeValue = timeZone(json);
                
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/place/${city}/' class="yellow-color" target="_blank">${city}, ${json.sys.country}</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                }
                catch(error) {
                    $('.results').html("La ville que vous avez rentré n'existe pas (dans l'API).");
                }
            }
        });
}

// Génère un nombre aléatoire entre un minimum inclus et un maximum inclus 
function randomNumber(min, max) {
    if (!isNaN(min) && !isNaN(max))
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        return messageError;
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

    let isValidDateFunction = isValidDate(birthDateDay + '/' + birthDateMonth + '/' + birthDateYear); 

    // Vérifie si la valeur entrée correspond à une date de naissance valide
    if(isValidDateFunction === true)
    {
        ageYears = formatNumberResult(ageYears);
        // Si c'est ton anniversaire aujourd'hui
        if(birthDateDay === parseInt(day) && (parseInt(birthDateMonth) + 1) === parseInt(month))
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

// Convertis une valeur dans une devise dans une autre devise
function convertCurrency(value, currency, url) {
    function currencyTest(currencyToTest) {
      for (let index in correspondancesMonnaie) {
        if(currencyToTest === correspondancesMonnaie[index]['currency']) {
          return correspondancesMonnaie[index]['symbol'];
        }
        continue;
      }
    }
    $.ajax({
        url : url,
        dataType : "json",
        success: function (jsonFixer) { 
            try {
              let currencySymboleAPI = eval(`jsonFixer.rates.${currencyTest(currency)}`);
              if (currencySymboleAPI === undefined) {
                currencySymboleAPI = 1;
              } 
              let exchangeRateYear = jsonFixer.date[0] + jsonFixer.date[1] + jsonFixer.date[2] + jsonFixer.date[3]; 
              let exchangeRateMonth = jsonFixer.date[5] + jsonFixer.date[6];
              let exchangeRateDay = jsonFixer.date[8] + jsonFixer.date[9];
              $('.results').html(formatNumberResult(value) + ' ' + jsonFixer.base + ' = ' + formatNumberResult((currencySymboleAPI * value).toFixed(2)) + ' ' + currency);
              $('.rateDate').html(`Dernier rafraîchissement du taux d'échange : ${exchangeRateDay}/${exchangeRateMonth}/${exchangeRateYear}`);
            } 
            catch (error) {
                $('.results').html(messageError);
            }
        }
    });
}

// Convertis des nombres de différentes bases et convertis en UTF-8. (source : http://jsfiddle.net/47zwb41o)
// Texte en Binaire (UTF-8)
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
// Binaire (UTF-8) en Texte
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
// Texte en Hexadécimal (UTF-8)
function utf8ToHex (s) {
    try {
        s = unescape( encodeURIComponent( s ) );
        var chr, i = 0, l = s.length, out = '';
        for( ; i < l; i++ ){
            chr = s.charCodeAt( i ).toString( 16 );
            out += ( chr.length % 2 == 0 ) ? chr : '0' + chr;
            out += " ";
        }
        return out;
    }
    catch (error) {
        return s;
    }
}
// Hexadécimal (UTF-8) en Texte
function hexToUtf8 (s) {
    try {
        return decodeURIComponent( s.replace( /../g, '%$&' ) );
    }
	catch (error) {
        return s;
    }
}
// Convertis des nombres de différents bases
function convertDecimalBinaryHexadecimal(value, option) {
    try {
        if (option === 'DecimalToBinary') {
            value = value.replace(" ", "");
            value = parseInt(value);
            if (isNaN(value)) {
                return messageError;
            } else {
                return value.toString(2);
            }
        }
        else if (option === 'BinaryToDecimal') {
            return formatNumberResult(parseInt(value, 2));
        }
        else if (option === 'DecimalToHexadecimal') {
            value = value.replace(" ", "");
            value = parseInt(value);
            if (isNaN(value)) {
                return messageError;
            } else {
                return value.toString(16).toUpperCase();
            }
        }
        else if (option === 'HexadecimalToDecimal') {
            return formatNumberResult(parseInt(value, 16)); 
        }
        else if (option === 'BinaryToHexadecimal') {
            value = parseInt(value, 2);
            if (isNaN(value)) {
                return messageError;
            } else {
                return parseInt(value).toString(16).toUpperCase();
            }
        }
        else if (option === 'HexadecimalToBinary') {
            value = parseInt(value, 16);
            if (isNaN(value)) {
                return messageError;
            } else {
                return parseInt(value).toString(2);
            }
        }
        else {
            return messageError;
        }
    } 
    catch (error) {
        return messageError;
    }
}

// Convertis un nombre arabe en nombre romain
function convertArabicToRoman(nombre) {
    // Initialisation de la variable qui va contenir le résultat de la conversion
    let chiffresRomains = "";

    /* 
        Étapes pour écrire un nombre romain :

        On vérifie quand le nombre arabe est >= à la plus grande valeur possible dans la table de correspondance des nombres romains de haut en bas puis on rajoute la lettre romaine correspondante à la plus grande valeur possible dans la variable chiffresRomains et on soustrait la valeur du chiffre romain qu'on vient d'ajouter au nombre arabe puis on répète l'opération jusqu'à nombre arabe vaut 0...

            Exemple avec 27 :
                27 - X (10) = 17
                17 - X (10) = 7
                7 - V (5) = 2
                2 - I (1) = 1
                1 - I (1) = 0
                XXVII
    */

    function extraireChiffreRomain(valeurLettre, lettres) {
        while (nombre >= valeurLettre) {
            chiffresRomains = chiffresRomains + lettres;
            nombre = nombre - valeurLettre;
        }
    }

    correspondancesRomainArabe.forEach(correspondance => {
        extraireChiffreRomain(correspondance[0], correspondance[1]);
    })

    if (chiffresRomains === '') {
        return messageError;
    } else {
        return chiffresRomains;
    }
}

// Convertis un nombre romain en nombre arabe
function convertRomanToArabic(str) {
    let result = 0;
    for (let i = 0;i < correspondancesRomainArabe.length; i++) {
      while (str.indexOf(correspondancesRomainArabe[i][1]) === 0){
        // Adding the decimal value to our result counter
        result += correspondancesRomainArabe[i][0];
        // Remove the matched Roman letter from the beginning
        str = str.replace(correspondancesRomainArabe[i][1],'');
      }
    }
    if (str != '') {
        result = 0;
    }
    return result;
}

// Vérifie si un nombre fait partie des nombres d'Armstrong ou non 
function armstrongNumber(number) {
    let numberString = number.toString();
    let numberStringLength = numberString.length;

    let result = 0;
    let resultString = "";
    for (let i = 0; i < numberStringLength; i++) {
        result = result + parseInt(numberString[i])**numberStringLength;
        resultString = resultString + " + " + numberString[i] + "<sup>" + numberStringLength + "</sup>";
    }

    number = formatNumberResult(number);
    if (result === number) {
        return `${number} est un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    } else {
        return `${number} n'est pas un nombre d'Armstrong, car ${resultString.slice(2)} = ${formatNumberResult(result)}.`;
    }
}

// Retourne un tableau contenant toutes les possibilités d'anagramme d'un mot
function stringPermutations(string) {
    let results = [];
  
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (let i = 0; i < string.length; i++) {
      let firstChar = string[i];
      let charsLeft = string.substring(0, i) + string.substring(i + 1);
      let innerPermutations = stringPermutations(charsLeft);
      for (let i = 0; i < innerPermutations.length; i++) {
        results.push(firstChar + innerPermutations[i]);
      }
    }
    return results;
}