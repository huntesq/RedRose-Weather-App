function formatDate(timestamp) {
  // `${day} ${hours}:${minutes} `
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours} `;
  }

  if (minutes < 10) {
    minutes = `0${minutes} `;
  }

  return `${day} ${hours}:${minutes} `;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">` === "";
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
        
          
            <div class="weather-forecast-date">${day}</div>

            <img
              src="https://openweathermap.org/img/wn/02d@2x.png"
              alt="image"
              width="50"
              class="forecast-icon"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">23°</span>
              <span class="weather-forecast-temperature-min">17°</span>
            </div>
          </div>
        </div>`;
    forecastHTML = forecastHTML + `</div>`;
  });

  forecastElement.innerHTML = forecastHTML;
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
