function displayCurrentTimeDate() {
  let now = new Date();
  let hour = now.getHours();
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

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();

  let currentDate = document.querySelector("h2");
  currentDate.innerHTML = `${day} ${date} ${month}
  <br />
  ${hour}:${minutes}`;
}

displayCurrentTimeDate();

function displayWeather(response) {
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");
  dailyHigh.innerHTML = Math.round(response.data.main.temp_max);
  dailyLow.innerHTML = Math.round(response.data.main.temp_min);
}

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("h1");
  let input = document.querySelector(".form-control");
  let city = input.value;
  cityName.innerHTML = city;

  let apiKey = "3d6f8628461b7f0c4152f6e35ba84367";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
`;

  axios.get(url).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function displayCurrentTemp(response) {
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");
  let cityName = document.querySelector("h1");
  dailyHigh.innerHTML = Math.round(response.data.main.temp_max);
  dailyLow.innerHTML = Math.round(response.data.main.temp_min);
  cityName.innerHTML = response.data.name;
}

function getPosition(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiKey = "3d6f8628461b7f0c4152f6e35ba84367";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayCurrentTemp);
}

function displayCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#search-button-2");
currentLocationButton.addEventListener("click", displayCurrentLocation);
