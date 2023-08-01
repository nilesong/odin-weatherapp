const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const date = document.querySelector('.date');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const rainChance = document.querySelector('.rainChance');
const windSpeed = document.querySelector('.windSpeed');
const errorField = document.querySelector('.error');

async function getWeather() {
  try {
    errorField.innerHTML = '';
    const cityRequest = prompt('City');
    // To remove current.json >> forecast.json already includes current data
    const request = `http://api.weatherapi.com/v1/forecast.json?key=9e75879a84fd47acb31141945230407&q=${cityRequest}&days=3`;
    const response = await fetch(request, {
      method: 'GET',
      mode: 'cors',
    });
    const weatherData = await response.json();

    city.innerHTML = weatherData.location.name;
    weather.innerHTML = weatherData.current.condition.text;
    temp.innerHTML = `${weatherData.current.temp_c} deg C`;
    date.innerHTML = weatherData.current.last_updated;
    feelsLike.innerHTML = `${weatherData.current.feelslike_c} deg C`;
    humidity.innerHTML = `${weatherData.current.humidity}%`;
    rainChance.innerHTML = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeed.innerHTML = `${weatherData.current.wind_kph}km/h`;
    console.log(weatherData);
  } catch (error) {
    console.log(error);
    console.log('bad');
    errorField.innerHTML = 'Invalid City Name';
  }
}

getWeather();
console.log('hello this is still working up to this point');

function changeweather() {
  document.body.style.backgroundImage = 'url(weatherpic.jpg)';
}

// To Do
// 1. dayForecast
// 2. weekForecast
// 3. Icons
// 4. Font
// 5. Search bar
