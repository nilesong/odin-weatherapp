/* eslint-disable no-plusplus */
// CURRENT DOM
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const date = document.querySelector('.date');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const rainChance = document.querySelector('.rainChance');
const windSpeed = document.querySelector('.windSpeed');
const errorField = document.querySelector('.error');

// FORECAST DOM
const dayForecast = document.querySelector('.dayForecast');
const weekForecast = document.querySelector('.weekForecast');

// FUNCTIONS
function convertDate(inputDate) {
  const day = new Date(inputDate);
  const dayValue = day.getDay();
  const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayArray[dayValue];
}

function displayCurrent(weatherData) {
  city.innerHTML = weatherData.location.name;
  weather.innerHTML = weatherData.current.condition.text;
  temp.innerHTML = `${weatherData.current.temp_c} C&deg`;
  date.innerHTML = convertDate(weatherData.current.last_updated);
  feelsLike.innerHTML = `${weatherData.current.feelslike_c} C&deg`;
  humidity.innerHTML = `${weatherData.current.humidity}%`;
  rainChance.innerHTML = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  windSpeed.innerHTML = `${weatherData.current.wind_kph}km/h`;
}

function displayDayForecast(weatherData) {
  for (let i = 0; i < 24; i++) {
    const hourDiv = document.createElement('div');
    const hour = document.createElement('div');
    const hourTemp = document.createElement('div');
    const iconDiv = document.createElement('div');
    const hourIcon = document.createElement('img');
    hourDiv.classList.add('hourDiv');
    hour.classList.add('hour');
    hourTemp.classList.add('hourTemp');
    iconDiv.classList.add('iconDiv');
    hourIcon.classList.add('hourIcon');

    hour.innerHTML = `${i}`;
    hourTemp.innerHTML = weatherData.forecast.forecastday[0].hour[i].temp_c;
    hourIcon.src = 'sunny.svg';

    hourDiv.appendChild(hour);
    hourDiv.appendChild(hourTemp);
    iconDiv.appendChild(hourIcon);
    hourDiv.appendChild(iconDiv);
    dayForecast.appendChild(hourDiv);
  }
}

function displayWeekForecast(weatherData) {
  for (let i = 0; i < 3; i++) {
    const dayDiv = document.createElement('div');
    const day = document.createElement('div');
    const dayTemp = document.createElement('div');
    const dayWeather = document.createElement('div');
    const iconDiv = document.createElement('div');
    const dayIcon = document.createElement('img');
    dayDiv.classList.add('dayDiv');
    day.classList.add('day');
    dayTemp.classList.add('dayTemp');
    dayWeather.classList.add('dayTemp');
    iconDiv.classList.add('iconDiv');
    dayIcon.classList.add('dayIcon');

    day.innerHTML = convertDate(weatherData.forecast.forecastday[i].date);
    dayTemp.innerHTML = weatherData.forecast.forecastday[i].day.avgtemp_c;
    dayWeather.innerHTML = weatherData.forecast.forecastday[i].day.condition.text;
    dayIcon.src = 'sunny.svg';

    dayDiv.appendChild(day);
    dayDiv.appendChild(dayTemp);
    dayDiv.appendChild(dayWeather);
    iconDiv.appendChild(dayIcon);
    dayDiv.appendChild(iconDiv);
    weekForecast.appendChild(dayDiv);
  }
}

async function getWeather() {
  try {
    errorField.innerHTML = '';
    const cityRequest = prompt('City');
    const request = `http://api.weatherapi.com/v1/forecast.json?key=9e75879a84fd47acb31141945230407&q=${cityRequest}&days=3`;
    const response = await fetch(request, {
      method: 'GET',
      mode: 'cors',
    });
    const weatherData = await response.json();
    console.log(weatherData);
    displayCurrent(weatherData);
    displayDayForecast(weatherData);
    displayWeekForecast(weatherData);
  } catch (error) {
    console.log(error);
    console.log('bad');
    errorField.innerHTML = 'Invalid City Name';
  }
}

getWeather();
// const weatherData = getWeather();
// displayCurrent(weatherData);
console.log('hello this is still working up to this point');

function changeweather() {
  document.body.style.backgroundImage = 'url(weatherpic.jpg)';
}

// To Do
// 1. dayForecast proper hour display, css scrollable
// 2. weekForecast proper day display
// 3. Icons
// 4. Font
// 5. Search bar
