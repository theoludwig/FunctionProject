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

// Vérifie si une date est valide par rapport à la date d'aujourd'hui 
function isValidDate(s) {

    // Date à vérifier 
    let toVerifyDate = s.split('/');
    let splitedToVerifyDate = toVerifyDate[2] + '-' + (parseInt(toVerifyDate[1]) + 1) + '-' + toVerifyDate[0];
    let msToVerifyDate = Date.parse(splitedToVerifyDate);

    // Date courante
    let currentDate = dateTimeUTC(0);
    currentDate = currentDate.substr(0,10);
    let currentDateSplited = currentDate.split('/');
    let currentDateFormat = currentDateSplited[2] + '-' + currentDateSplited[1] + '-' + currentDateSplited[0];
    let msCurrentDate = Date.parse(currentDateFormat);

    if(msToVerifyDate <= msCurrentDate) {
        return true;
    } else if(msToVerifyDate > msCurrentDate) {
        return false;
    } else {
        return messageError;
    }
}