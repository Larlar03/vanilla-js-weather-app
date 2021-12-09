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
  if (time < 17) {
    container.style.background =
      "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)";
  } else {
    container.style.background =
      "linear-gradient(to right, #8faad2 0%, #ffb1b1 100%)";
  }
}

changeBackground();

// Current temperature*/
function displayCurrentWeather(response) {
  // City name
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  document.querySelector("#city").innerHTML = `${cityName}, ${countryName}`;
  // Current temp
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  // Humidy
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  // Wind speed
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed} m/s`;
  // Weather description
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  //Weather icon
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  // Setting the alt of the img to the weather description
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

//  Daily forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id="forecast-day">
              <h4>${formatDay(forecastDay.dt)}</h4>
               <img src="https://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" alt="${forecastDay.weather.description}" />
              <ul>
                <li><span id="temp-min">${Math.round(
                  forecastDay.temp.min
                )}</span><span class="min-degree">°</span> </li>
                <li><span id="temp-max">${Math.round(
                  forecastDay.temp.max
                )}</span><span class="max-degree">°</span></li>
              </ul>
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast-container");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "69faa246958c7e8b9f28cdf549e266bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// City Search
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

function searchCity(city) {
  let apiKey = "69faa246958c7e8b9f28cdf549e266bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentWeather);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// Sets default page city to Birmingham by using city id api url
function searchCityById(cityId) {
  let apiKey = "69faa246958c7e8b9f28cdf549e266bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

searchCityById(2655603);

// Displays weather of computer location coordinates
function searchLocation(position) {
  let apiKey = "69faa246958c7e8b9f28cdf549e266bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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
