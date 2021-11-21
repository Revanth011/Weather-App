const locat = document.querySelector('#input-search');
const search = document.querySelector('#app-btn1');
const search2 = document.querySelector('#app-btn2');

const place = document.querySelector('.place');
const date = document.querySelector('.date');
date.innerHTML = moment().format('LL');

const weather_list = document.querySelector('.weather-list');

BASE_URL1 = 'https://api.openweathermap.org/geo/1.0/direct?appid=159551cdaf4efa74c90100fa4db7c878';
BASE_URL2 = 'https://api.openweathermap.org/data/2.5/onecall?appid=159551cdaf4efa74c90100fa4db7c878';

const getLocation1 = async (l) => {
    const locati = await fetch(BASE_URL1 + `&limit=1&q=${l}`);
    const respo = await locati.json();
    weatherData(respo[0].lat, respo[0].lon);
}
function getLocation2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            weatherData(position.coords.latitude, position.coords.longitude);
        });
    }
}
const weatherData = async (lat, long) => {
    const weather = await fetch(BASE_URL2 + `&units=metric&exclude=minutely&lat=${lat}&lon=${long}`)
    const respon = await weather.json();
    appUI(respon);
    appUIItems(respon);
}
search.addEventListener('click', (e) => {
    getLocation1(locat.value);
    place.innerHTML = locat.value.toUpperCase();
    weather_list.innerHTML = "";
});
search2.addEventListener('click', (e) => {
    getLocation2();
    place.innerHTML = "";
    weather_list.innerHTML = "";
});
function appUI(respon) {
    const weather_img = document.querySelector('.weather-img');
    const weather_img_text = document.querySelector('.weather-img-text');

    const pressure = document.querySelector('#pressure');
    const humidity = document.querySelector('#humidity');
    const temperature = document.querySelector('#temperature');

    const temp = document.querySelector('.temp');
    const feels_like = document.querySelector('.feels-like');

    weather_img.src = `https://openweathermap.org/img/wn/${respon.current.weather[0].icon}@2x.png`;
    weather_img_text.innerHTML = respon.current.weather[0].main;

    pressure.innerHTML = "Pressure " + respon.current.pressure + ' mb';
    humidity.innerHTML = "Humidity " + respon.current.humidity + ' %';
    temperature.innerHTML = "Temperature " + respon.current.temp + ' &#8451';

    temp.innerHTML = respon.current.temp + "&#8451";
    feels_like.innerHTML = "feels like " + respon.current.feels_like + " &#8451";
}
function appUIItems(respon) {
    for (let i = 1; i < 7; i++) {
        let weather_date = moment(respon.daily[i].dt * 1000, "x").format("DD MMM YYYY");
        weather_list.innerHTML += `<div class="weather-list-item">
        <div class="weather-list-date">${weather_date}</div>
        <div class="weather-list-img"><img class="weather-img" src="${`https://openweathermap.org/img/wn/${respon.daily[i].weather[0].icon}@2x.png`}"
                alt="" />
        </div>
        <div class="weather-list-text">${respon.daily[i].weather[0].main}</div>
        <div class="weather-list-temp">MaxTemp  <b>${respon.daily[i].temp.max}&#8451</b></div>
        <div class="weather-list-pressure">Pressure  <b>${respon.daily[i].pressure} mb</b></div>
        <div class="weather-list-humidity">Humidity  <b>${respon.daily[i].humidity} %</b></div>
    </div>`
    }
}
appStart();
function appStart() {
    getLocation1("Bangalore");
    place.innerHTML = locat.value.toUpperCase();
    weather_list.innerHTML = "";
}
