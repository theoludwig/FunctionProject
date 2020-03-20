const config = {
    PORT: process.env.PORT || 8080,
    WEATHER_API_KEY: process.env.OpenWeatherMap_API_KEY,
    DATABASE: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
};

module.exports = config;