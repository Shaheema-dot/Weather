const apiKey = '6dce9a7b86e6c8bf64ff4f0e5c57352b';

document.getElementById('searchBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput) {
        getWeatherData(cityInput);
        getForecastData(cityInput);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cityNameElement = document.getElementById('cityName');
        const weatherDescriptionElement = document.getElementById('weatherDescription');
        const temperatureElement = document.getElementById('temperature');
        const weatherContainer = document.querySelector('.weather-container');

        weatherContainer.classList.remove('rainy-background');
        weatherContainer.classList.remove('haze-background');
        weatherContainer.classList.remove('cloudy-background');
        weatherContainer.classList.remove('sunny-background');
        weatherContainer.classList.remove('snowy-background');
        cityNameElement.textContent = data.name;
        weatherDescriptionElement.textContent = data.weather[0].description;
        temperatureElement.textContent = `${data.main.temp} °C`;
        const weatherMain = data.weather[0].main.toLowerCase();
    
        if (weatherMain === 'rain') {
            weatherContainer.classList.add('rainy-background');
        } else if (weatherMain === 'clouds') {
            weatherContainer.classList.add('cloudy-background');
        } else if (weatherMain === 'clear') {
            weatherContainer.classList.add('sunny-background');
        } else if (weatherMain === 'snow') {
            weatherContainer.classList.add('snowy-background');
        }else if (weatherMain === 'haze') {
            weatherContainer.classList.add('haze-background');
        }
 
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


async function getForecastData(city) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(forecastApiUrl);
        const data = await response.json();

        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
            const forecastTemp = forecast.main.temp.toFixed(1);

            const forecastDayElement = document.createElement('div');
            forecastDayElement.classList.add('forecast-day');
            forecastDayElement.innerHTML = `
                <p>${forecastDay}</p>
                <p>${forecastTemp} °C</p>
                <p>${forecast.weather[0].description}</p>
            `;

            forecastContainer.appendChild(forecastDayElement);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

