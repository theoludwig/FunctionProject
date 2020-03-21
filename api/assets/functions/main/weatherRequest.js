const axios               = require('axios');
const Queue               = require('smart-request-balancer');
const errorHandling       = require('../../utils/errorHandling');
const { requiredFields }  = require('../../config/errors');
const { WEATHER_API_KEY } = require('../../config/config');

const queue = new Queue({
    /*
        rate: number of requests
            per
        limit: number of seconds
    */
    rules: {
        weatherRequest: { 
            rate: 50,            
            limit: 60,           
            priority: 1
        },
    }
});

/* OUTPUTS */
exports.weatherRequestOutput = async ({ res, next }, argsObject) => {
    let { cityName } = argsObject;

    // S'il n'y a pas les champs obligatoire
    if (!(cityName)) {
        return errorHandling(next, requiredFields);
    }

    // Récupère les données météo grâce à l'API : openweathermap.org. (→ avec limite de 50 requêtes par minute)
    queue.request(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&units=metric&appid=${WEATHER_API_KEY}`)
            .then((response) => res.status(200).json(response.data))
            .catch(() => errorHandling(next, { message: "La ville n'existe pas (dans l'API de openweathermap.org).", statusCode: 404 }));
    }, 'everyone', 'weatherRequest');
}