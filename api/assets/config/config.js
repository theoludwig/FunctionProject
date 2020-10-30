const dotenv = require('dotenv')

dotenv.config()
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT ?? '465', 10)

const config = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST,
  FRONT_END_HOST: process.env.FRONT_END_HOST,
  WEATHER_API_KEY: process.env.OpenWeatherMap_API_KEY,
  SCRAPER_API_KEY: process.env.Scraper_API_KEY,
  DATABASE: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT ?? '3306', 10)
  },
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_INFO: {
    host: process.env.EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    ignoreTLS: process.env.NODE_ENV !== 'production'
  },
  TOKEN_LIFE: '1 week'
}

module.exports = config
