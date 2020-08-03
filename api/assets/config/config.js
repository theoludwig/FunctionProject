const config = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST,
  FRONT_END_HOST: process.env.FRONT_END_HOST,
  WEATHER_API_KEY: process.env.OpenWeatherMap_API_KEY,
  SCRAPER_API_KEY: process.env.Scraper_API_KEY,
  DATABASE: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_INFO: {
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },
  TOKEN_LIFE: '1 week'
}

module.exports = config
