const apiKey = 'd487e075d1f15570fe7e61f5c14fc627'; // Replace with your actual API key
const weatherDisplay = document.getElementById('weatherDisplay');
const getWeatherButton = document.getElementById('getWeather');

getWeatherButton.addEventListener('click', () => {
    const location = document.getElementById('location').value || 'auto:ip';
    fetchWeather(location);
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            weatherDisplay.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { main, weather, name } = data;
    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
