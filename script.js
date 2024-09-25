const apiKey = "11f1f5caf033e878fc8356873beb26ed"; // Replace with your OpenWeatherMap API key

document.getElementById('weather-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const city = document.getElementById('city').value;
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const weatherInfo = `
          <div class="weather-details">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
          </div>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
      } else {
        document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
      }
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = `<p>Unable to retrieve data. Please try again later.</p>`;
      console.error('Error fetching data:', error);
    });
}