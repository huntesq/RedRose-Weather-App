function formatDate(timestamp) {
  // `${day} ${hours}:${minutes} `
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  return days[day];

  if (hours < 10) {
    hours = `0${hours} `;
  }

  if (minutes < 10) {
    minutes = `0${minutes} `;
  }

  return `${day} ${hours}:${minutes} `;
}

function formatDay(timestamp) {}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
        
          
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>

            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="image"
              width="50"
              class="forecast-icon"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}</span>
            </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${bd3bb6534458ba51b48c49f5155745b6}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let CityInputElement = document.querySelector("#city-input");
  search(CityInputElement.value);
}

search("Johannesburg");
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
