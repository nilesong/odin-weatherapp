const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const errorField = document.querySelector('.error');

async function getWeather() {
  try {
    errorField.innerHTML = '';
    const cityRequest = prompt('City');
    // To remove current.json >> forecast.json already includes current data
    const request1 = `http://api.weatherapi.com/v1/current.json?key=9e75879a84fd47acb31141945230407&q=${cityRequest}`;
    const response1 = await fetch(request1, {
      method: 'GET',
      mode: 'cors',
    });
    const weatherData1 = await response1.json();
    const request2 = `http://api.weatherapi.com/v1/forecast.json?key=9e75879a84fd47acb31141945230407&q=${cityRequest}`;
    const response2 = await fetch(request2, {
      method: 'GET',
      mode: 'cors',
    });
    const weatherData2 = await response2.json();
    city.innerHTML = weatherData1.location.name;
    temp.innerHTML = `Temperature is ${weatherData1.current.temp_c}`;
    weather.innerHTML = `Weather is ${weatherData1.current.condition.text}`;
    console.log(weatherData1);
    console.log(weatherData2);
    console.log(weatherData1.current.temp_c);
    console.log(weatherData1.current.feelslike_c);
    console.log(weatherData1.current.humidity);
    console.log(weatherData1.current.wind_kph);
    console.log(weatherData1.current.condition.text);
    console.log(weatherData1.location.name);
    console.log(weatherData1.location.localtime);
  } catch (error) {
    console.log(error);
    console.log('bad');
    errorField.innerHTML = 'Invalid City Name';
  }
}

getWeather();
console.log('hello this is still working up to this point');
