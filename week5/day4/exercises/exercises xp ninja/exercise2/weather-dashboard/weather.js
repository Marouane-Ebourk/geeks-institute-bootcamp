const axios = require('axios');

// Replace with your OpenWeatherMap API key
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

async function getWeather(city) {
    const chalk= (await import('chalk')).default;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const cityName = data.name;

        const tempColor = temp < 15 ? chalk.blue : chalk.red;
        console.log(
            chalk.blue.bold(`Weather for ${cityName}:`) + '\n' +
            tempColor(`Temperature: ${temp}°C`) + '\n' +
            chalk.green(`Description: ${desc}`)
        );
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(chalk.red('City not found. Please try again.'));
        } else {
            console.log(chalk.red('Error fetching weather data.'));
        }
    }
}

module.exports = { getWeather };
