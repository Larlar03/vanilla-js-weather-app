// Current time & day
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

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

// Day & night background
function changeBackground() {
  let container = document.querySelector("body");
  let time = now.getHours();
  if (time < 18) {
    container.style.background =
      "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)";
  } else {
    container.style.background =
      "radial-gradient(circle at 0.4% -0.6%, rgb(143, 170, 210) 0%, rgb(255, 177, 177) 90%)";
  }
}

changeBackground();

// City search & sisplay current temperature*/
function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}km/h`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );

  celsiusTemperature = response.data.main.temp;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

function searchCity(city) {
  let apiKey = "76261526781005dcd8b27ca5524074f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// Sets default page city to Birmingham by using city id api url
function searchCityById(cityId) {
  let apiKey = "76261526781005dcd8b27ca5524074f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

searchCityById(2655603);

// Displays weather of computer location coordinates
function searchLocation(position) {
  let apiKey = "76261526781005dcd8b27ca5524074f5";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Celsius & fahrenheit conversion
function changeToFahrenheit(event) {
  event.preventDefault;
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheit}`;

  // Remove active class from celsius link & add to fahrenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;

function changeToCelsius(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  // Remove active class from F link & add to C link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector(".celsius-link");
let fahrenheitLink = document.querySelector(".fahrenheit-link");

fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);
