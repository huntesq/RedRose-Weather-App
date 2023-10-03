function formatDate(timestamp) {
  // `${day} ${hours}:${minutes} `
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.main.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "8ba84ff1f0d264o7e59dft09ea490231";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=NewYork&appid=`${apiKey}&units=metric`";

axios.get(apiUrl).then(displayTemperature);
