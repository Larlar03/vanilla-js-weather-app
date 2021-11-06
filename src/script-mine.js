/*Current Time & Day*/
let h2 = document.querySelector("h2");

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();

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

h2.innerHTML = `${day} <br /> ${hour}:${minutes}`;

/*City Searched*/
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

/*Celsius & Fahrenheit*/

function changeToCelsius(event) {
  event.preventDefault;
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = 18;
}

function changeToFahrenheit(event) {
  event.preventDefault;
  let temperature = 18;
  let fahrenheit = Math.round((temperature * 9) / 5 + 32);

  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `${fahrenheit}`;
}

let celsiusTemp = document.querySelector(".celsius-temp");
let fahrenheitTemp = document.querySelector(".fahrenheit-temp");

fahrenheitTemp.addEventListener("click", changeToFahrenheit);
celsiusTemp.addEventListener("click", changeToCelsius);
