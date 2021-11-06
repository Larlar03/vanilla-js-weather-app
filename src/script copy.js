/*Current Time & Day*/
function formatDate(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} <br /> ${hours}:${minutes}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

/*City Searched*/
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  let searchInputValue = searchInput.value;
  city.innerHTML = `${searchInputValue}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

/* Display City * Current Temp */

function showTemperature(response) {
  console.log(response.data);
  let = temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

axios.get(apiUrl).then(showTemperature);

/*Celsius & Fahrenheit*/

function changeToFahrenheit(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  let fahrenheit = Math.round((temperature * 9) / 5 + 32);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${fahrenheit}`;
}

function changeToCelsius(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = 18;
}

let celsiusLink = document.querySelector(".celsius-link");
let fahrenheitLink = document.querySelector(".fahrenheit-link");

fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);
