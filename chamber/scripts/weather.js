const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastList = document.querySelector('#forecast-list');
const apiKey = '8bc66f0012a8b260072157ed4c04b2b4';
const city = 'Harare';
const countryCode = 'ZW';

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

// Function to display current weather
function displayResults(data) {
    const temp = Math.round(data.main.temp);
    currentTemp.textContent = `${temp}°C`;

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    captionDesc.textContent = data.weather[0].description;
}

// Function to display 3-day weather forecast
function displayForecast(data) {
    forecastList.innerHTML = ''; // Clear previous forecast data

    const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3);

    filteredForecast.forEach((forecast) => {
        const dayShort = new Date(forecast.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short', // Use "short" for abbreviated day names (e.g., Mon, Tue)
        });

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p><strong>${dayShort}</strong></p>
            <p>Temp: ${Math.round(forecast.main.temp)}°C</p>
            <p>${forecast.weather[0].description}</p>
        `;
        forecastList.appendChild(listItem);
    });
}

// Fetch current weather data
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error fetching current weather:', error);
    }
}

// Fetch weather forecast data
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error fetching forecast:', error);
    }
}

// Execute both functions
fetchCurrentWeather();
fetchWeatherForecast();
