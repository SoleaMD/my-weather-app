// Display current day and time
let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = weekDays[now.getDay()];

let zeroDay = document.querySelector(
  "#current-day"
);
zeroDay.innerHTML = currentDay;

let actualHour = now.getHours();
if (actualHour < 10) {
  actualHour = `0${actualHour}`;
}

let actualMinutes = now.getMinutes();
if (actualMinutes < 10) {
  actualMinutes = `0${actualMinutes}`;
}

let currentHour = document.querySelector("#hour");
let currentMinutes =
  document.querySelector("#minutes");

currentHour.innerHTML = actualHour;
currentMinutes.innerHTML = actualMinutes;

// Function search engine for cities
// And display the city name searched
// after the user submits form.

function readCity(event) {
  event.preventDefault();
  let selectedCity = document.querySelector(
    "#city-selected"
  );
  let searchedCity =
    document.querySelector("#city");
  let city = selectedCity.value;
  city = city.trim();
  city = city.toLowerCase();
  const myCity =
    city.charAt(0).toUpperCase() + city.slice(1);
  searchedCity.innerHTML = myCity;

  // API

  let apiKey = "31494f01ec42e369b1839339e1ef40bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// Call city search function

let newCity =
  document.querySelector("#city-form");

newCity.addEventListener("submit", readCity);

// Obtain weather data using search form

function obtainForecast(coordinates) {
  let apiKey = "31494f01ec42e369b1839339e1ef40bd";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = Math.round(
    response.data.main.temp
  );
  let zeroDay = document.querySelector(
    "#zero-day-degrees"
  );
  zeroDay.innerHTML = `${temperature}º`;
  let apiCity = document.querySelector("#city");
  apiCity.innerHTML = response.data.name;
  let feelsLike = document.querySelector(
    ".degrees-outside"
  );
  let feelsTemp = Math.round(
    response.data.main.feels_like
  );
  feelsLike.innerHTML = `Feels like: ${feelsTemp}º`;
  let humidity =
    document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector(
    ".weather-description"
  );
  description.innerHTML = `${response.data.weather[0].description}`;
  let windSpeed = Math.round(
    response.data.wind.speed
  );
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
  let iconType = response.data.weather[0].icon;
  let icon = document.querySelector(
    ".current-weather-emoji"
  );
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconType}@2x.png`
  );
  icon.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  celsiusDegrees = response.data.main.temp;
  tempFeels = response.data.main.feels_like;

  obtainForecast(response.data.coord);
}

// Obtain weather data using coordinates

function revealPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let newApiKey =
    "31494f01ec42e369b1839339e1ef40bd";
  let newApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${newApiKey}&units=metric`;

  axios.get(newApiUrl).then(obtainTemperature);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(
    revealPosition
  );
}

function obtainTemperature(response) {
  let currentTemperature = Math.round(
    response.data.main.temp
  );
  let currentCity = response.data.name;
  let zeroDay = document.querySelector(
    "#zero-day-degrees"
  );
  zeroDay.innerHTML = `${currentTemperature}º`;
  let city = document.querySelector("#city");
  city.innerHTML = `${currentCity}`;
  let feelsLike = document.querySelector(
    ".degrees-outside"
  );
  let feelsTemp = Math.round(
    response.data.main.feels_like
  );
  feelsLike.innerHTML = `Feels like: ${feelsTemp}º`;
  let humidity =
    document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector(
    ".weather-description"
  );
  description.innerHTML = `${response.data.weather[0].main}`;
  let windSpeed = Math.round(
    response.data.wind.speed
  );
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
  let iconType = response.data.weather[0].icon;
  let icon = document.querySelector(
    ".current-weather-emoji"
  );
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconType}@2x.png`
  );
  icon.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  celsiusDegrees = response.data.main.temp;
  tempFeels = response.data.main.feels_like;

  obtainForecast(response.data.coord);
}

let img = document.querySelector("img");
img.addEventListener("click", getCoordinates);

// Changing Theme Light or Dark

function changeLight(event) {
  event.preventDefault();
  let firstTheme = (document.querySelector(
    "link[href='src/dark-style.css']"
  ).href = "src/light-style.css");
}

let lightButton = document.querySelector(
  ".light-button"
);
lightButton.addEventListener(
  "click",
  changeLight
);

function changeDark(event) {
  event.preventDefault();
  let secondTheme = (document.querySelector(
    "link[href='src/light-style.css']"
  ).href = "src/dark-style.css");
}

let darkButton = document.querySelector(
  ".dark-button"
);
darkButton.addEventListener("click", changeDark);

// Changing Celsius and Fahrenheit Degrees

function changeCelsius(event) {
  event.preventDefault();
  let zeroDayCelsius = document.querySelector(
    "#zero-day-degrees"
  );
  zeroDayCelsius.innerHTML = `${Math.round(
    celsiusDegrees
  )}º`;
  let selectedCelsius = document.querySelector(
    "#selected-degrees"
  );
  selectedCelsius.innerHTML = ` Celsius`;
  let celsiusFeels = document.querySelector(
    ".degrees-outside"
  );
  celsiusFeels.innerHTML = `Feels like: ${Math.round(
    tempFeels
  )}º`;
}

let degreesCelsius =
  document.querySelector(".celsius");

degreesCelsius.addEventListener(
  "click",
  changeCelsius
);

function changeFahrenheit(event) {
  event.preventDefault();
  let zeroDayFahrenheit = document.querySelector(
    "#zero-day-degrees"
  );
  let fahrenheitDegrees = Math.round(
    (celsiusDegrees * 9) / 5 + 32
  );
  zeroDayFahrenheit.innerHTML = `${fahrenheitDegrees}º`;

  let selectedFahrenheit = document.querySelector(
    "#selected-degrees"
  );
  selectedFahrenheit.innerHTML = ` Fahrenheit`;
  let fahrenheitFeels = document.querySelector(
    ".degrees-outside"
  );
  fahrenheitFeels.innerHTML = `Feels like: ${Math.round(
    (tempFeels * 9) / 5 + 32
  )}º`;
}

let degreesFahrenheit = document.querySelector(
  ".fahrenheit"
);

degreesFahrenheit.addEventListener(
  "click",
  changeFahrenheit
);

let celsiusDegrees = null;
let tempFeels = null;

// Adding rest of the week forecast

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDay();
  return weekDays[forecastDay];
}

function displayForecast(response) {
  let weekForecast =
    document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let firstForecastDays = [
    response.data.daily[1],
    response.data.daily[2],
    response.data.daily[3],
  ];
  let secondForecastDays = [
    response.data.daily[4],
    response.data.daily[5],
  ];
  let firstDays = firstForecastDays.forEach(
    function (day) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4 forecast-day">
            <div class="card-days mx-auto">
              <div class="card-body">
                <h6 class="card-subtitle mb-2">
                  ${formatDate(day.dt)}
                </h6>
                <h3 class="card-text">
                  <img src="https://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png" class="current-weather-emoji" alt="${
          day.weather[0].description
        }"> <div>
                  <span class="degrees">${Math.round(
                    day.temp.max
                  )}º /
                   ${Math.round(
                     day.temp.min
                   )}º</span>
                  </div>
                </h3>
                   <h6
                  class="card-subtitle mb-2 weather-description"
                >
                  ${day.weather[0].description}
                </h6>
              </div>
            </div>
          </div>`;
    }
  );
  let secondDays = secondForecastDays.forEach(
    function (day) {
      forecastHTML =
        forecastHTML +
        `<div class="col-6 forecast-day">
            <div class="card-days mx-auto">
              <div class="card-body">
                <h6 class="card-subtitle mb-2">
                  ${formatDate(day.dt)}
                </h6>
                <h3 class="card-text">
                  <img src="https://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png" class="current-weather-emoji" alt="${
          day.weather[0].description
        }"> <div>
                  <span class="degrees">${Math.round(
                    day.temp.max
                  )}º /
                  ${Math.round(
                    day.temp.min
                  )}º</span></div>
                </h3>
                   <h6
                  class="card-subtitle mb-2 weather-description"
                >
                  ${day.weather[0].description}
                </h6>
              </div>
            </div>
          </div>`;
    }
  );
  forecastHTML = forecastHTML + `</div>`;
  weekForecast.innerHTML = forecastHTML;
}
