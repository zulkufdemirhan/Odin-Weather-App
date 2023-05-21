const URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = ""

const form = document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
});

const search = document.querySelector('#search_city');
search.addEventListener('keypress', setApp);

const submitSearch = document.querySelector('#search_city_button');
submitSearch.addEventListener('click', submitApp)

search.addEventListener('input', function() {
  if (search.value.trim() === '') {
    submitSearch.disabled = true;
  } else {
    submitSearch.disabled = false;
  }
});

function setApp (e){
  if (e.code == "Enter"){
    getResult(search.value)
  }
}

function submitApp (){
  getResult(search.value)
}

function getResult(city){
  const api = `${URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`

  async function getData() {
    const response = await fetch(api);
    if (response.status >= 200 && response.status <= 299) {
      const weatherData = await response.json();
      displayResult(weatherData);
    } else {
      console.log("====ERROR====");
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
}

