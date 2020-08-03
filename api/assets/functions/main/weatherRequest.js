const axios = require('axios')
const Queue = require('smart-request-balancer')
const errorHandling = require('../../utils/errorHandling')
const { requiredFields } = require('../../config/errors')
const { WEATHER_API_KEY } = require('../../config/config')
const dateTimeUTC = require('../secondary/dateTimeManagement')
const capitalize = require('../secondary/capitalize')

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
    }
  }
})

/* OUTPUTS */
module.exports = ({ res, next }, argsObject) => {
  let { cityName } = argsObject

  // S'il n'y a pas les champs obligatoire
  if (!cityName) {
    return errorHandling(next, requiredFields)
  }

  cityName = cityName.split(' ').join('+')

  // Récupère les données météo grâce à l'API : openweathermap.org. (→ avec limite de 50 requêtes par minute)
  queue.request(
    () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&units=metric&appid=${WEATHER_API_KEY}`
        )
        .then(response => {
          const json = response.data
          const showDateTimeValue = dateTimeUTC(
            (json.timezone / 60 / 60).toString()
          ).showDateTimeValue
          const resultHTML = `<p>🌎 Position : <a href="https://www.google.com/maps/search/?api=1&query=${
            json.coord.lat
          },${json.coord.lon}" rel="noopener noreferrer" target="_blank">${
            json.name
          }, ${
            json.sys.country
          }</a><br/>⏰ Date et heure : ${showDateTimeValue} <br/>☁️ Météo : ${capitalize(
            json.weather[0].description
          )}<br/>🌡️ Température : ${json.main.temp} °C<br/> 💧 Humidité : ${
            json.main.humidity
          }% <br/> <img src="https://openweathermap.org/img/wn/${
            json.weather[0].icon
          }@2x.png"/></p>`
          return res.status(200).json({ result: json, resultHTML })
        })
        .catch(() =>
          errorHandling(next, {
            message:
              "La ville n'existe pas (dans l'API de openweathermap.org).",
            statusCode: 404
          })
        )
    },
    'everyone',
    'weatherRequest'
  )
}
