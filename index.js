const URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "b21ab90f469c7307705b0c8716de55ee"
let UNIT = "metric"

const unitButton = document.querySelector('#unit-button');
unitButton.addEventListener('click', () => {
  if (UNIT === "metric") {
    UNIT = "imperial"
    unitButton.innerText = "Imperial"
    getResult(search.value)
  }else{
    UNIT = "metric"
    unitButton.innerText = "Metric"
    getResult(search.value)
  }
});

const form = document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
});

const weatherBody = document.querySelector('#weather-body');

const search = document.querySelector('#search_city');
search.addEventListener('keypress', setApp);

function setApp (e){
  if (e.code == "Enter"){
    getResult(search.value)
  }
}

search.addEventListener('input', function() {
  if (search.value.trim() === '') {
    submitSearch.disabled = true;
  } else {
    submitSearch.disabled = false;
  }
});

const submitSearch = document.querySelector('#search_city_button');
submitSearch.addEventListener('click', submitApp)

function submitApp (){
  getResult(search.value)
}

function getResult(city){
  const api = `${URL}weather?q=${city}&appid=${API_KEY}&units=${UNIT}&lang=en`
  async function getData() {
    const response = await fetch(api);
    if (response.status >= 200 && response.status <= 299) {
      const weatherData = await response.json();
      weatherBody.style.display = "flex";
      displayResult(weatherData);
    } else {
      notification("Please check the correctness of the city name.", "alert-warning");
    }
  }
  getData()
}

function displayResult (data) {
  const cityName = document.querySelector('#city-name');
  cityName.innerText = `${data.name} / ${data.sys.country}`

  const weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.style.backgroundImage = "url('https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png')";

  const weatherDesc = document.querySelector('#weather-desc');
  weatherDesc.innerText = `${data.weather[0].main} / ${data.weather[0].description}`

  const humidity = document.querySelector('#humidity');
  humidity.innerText = data.wind.speed

  const wind = document.querySelector('#wind');
  wind.innerText = data.wind.speed

  const tempreture = document.querySelector('#weather-temp');
  tempreture.innerText = `${Math.round(data.main.temp)}°${UNIT === "metric" ? "C" : "F"}`;

  switch(data.weather[0].main) {
    case "Clouds":
      notification("Don't let the cloudy weather bother you.", "alert-primary");
    break;
    case "Clear":
      notification("The weather looks nice to spend time outside.", "alert-success");
    break;
  }
}

// Notification Component
function notification (message, color) {
  const notification = document.querySelector('#notification-box');
  const notificationText = document.querySelector('#notification-text');
  notification.style.display = "flex";
  notification.classList.add(color);
  notificationText.innerHTML = message;
}