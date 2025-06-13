const axios = require("axios");

function fetchWeatherData() {
    const URL =
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m ";

    axios
        .get(URL)
        .then((response) => {
            console.log("Weather Data for Berlin:");
            console.log(
                "Temperature:",
                response.data.current_weather.temperature,
                "°C"
            );
            console.log(
                "Wind Speed:",
                response.data.current_weather.windspeed,
                "km/h"
            );
            console.log(
                "Wind Direction:",
                response.data.current_weather.winddirection,
                "°"
            );
        })
        .catch((error) => {
            console.error("Error fetching data:", error.message);
        });
}

module.exports = fetchWeatherData;
