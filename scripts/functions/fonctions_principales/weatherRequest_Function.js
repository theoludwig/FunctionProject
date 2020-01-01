import { dateTimeUTC } from '../fonctions_annexes/dateTimeManagement_Functions.js';
import { capitalize } from '../fonctions_annexes/capitalize_Function.js';

/** 
 * @function weatherRequest
 * @description Affiche la météo et l'heure locale grâce à l'API : openweathermap.org.
 * Le nom de la ville se récupère en Javascript qui créé un cookie pour récupérer cette variable en php. 
 * Ainsi PHP va récupérer le JSON de l'api openweathermap.org puis ajax va se charger d'afficher le résultat.
 * Plus d'informations : {@link /php/getWeatherJson.php}
 * @requires {@link fonctions_annexes.js: dateTimeUTC, showDateTime, capitalize} 
 * @see {@link https://jquery.com/} Requête en AJAX avec jQuery
 * @see {@link https://openweathermap.org/} API de météo
 * @example  
 * Ajoute au DOM de la page dans la div .results, la météo de la ville demandée.
 */ 
function weatherRequest(cityData) {
    $.ajax({
        type: 'POST',
        url: '/php/getWeatherJson.php', 
        data: cityData,
            success: function(data) {
                try {
                    const json = jQuery.parseJSON(data);
                    const city = json.name;
                    const showDateTimeValue = dateTimeUTC((json.timezone / 60 / 60).toString()).showDateTimeValue;
                    $('.results').html(`🌎 Position : <a href='https://www.google.com/maps/search/?api=1&query=${json.coord.lat},${json.coord.lon}' class="yellow-color" target="_blank">${city}, ${json.sys.country}</a><br>⏰ Date et heure : ${showDateTimeValue}<br>☁️ Météo : ${capitalize(json.weather[0].description)}<br> 🌡️ Température : ${json.main.temp} °C<br> 💧 Humidité : ${json.main.humidity}% <br> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"/>`); 
                }
                catch(error) {
                    $('.results').html("La ville que vous avez rentré n'existe pas (dans l'API).");
                }
            }
        });
}

/* Exports */
export { weatherRequest };