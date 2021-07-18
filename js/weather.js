const API_KEY = '705df63ca50fa146600bff02d428e3ae';

function showWeather(t, d, ws, wd, p, h, cr, i) {
    console.log(t, d, ws, wd, p, h, cr, i);
    const weatherTemp = document.querySelector('.js-temp');
    const weatherDesc = document.querySelector('.js-desc');
    const weatherWind = document.querySelector('.js-wind');
    const weatherPress = document.querySelector('.js-press');
    const weatherHum = document.querySelector('.js-hum');
    const weatherCR = document.querySelector('.js-cr');
    const weatherIcon = document.querySelector('.js-w-icon');

    weatherTemp.innerHTML = `${t}&deg;`;
    weatherDesc.innerHTML = d
    weatherWind.innerHTML = `${ws} м/с, ${wd}`
    weatherPress.innerHTML = `${p} мм рт. ст.`
    weatherHum.innerHTML = `${h}%`
    weatherCR.innerHTML = `${cr}%`
    weatherIcon.style.backgroundImage = `url('images/${i}.png')`
};

function getWeather(lat, lon) {
   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${API_KEY}&units=metric&lang=ru`)
   .then(function(response) {
       return response.json();
   })
   .then(function(json){
       let temp = json.current.temp;
       let tempUnits = askUnits();

       if(tempUnits == 'F') {
           temp = roundNum(9/5*temp+32)
       } else {
            temp = roundNum(temp);
       }

       let desc = json.current.weather[0].description;
       let windSpeed = roundNum(json.current.wind_speed);
       let windDir = determinationDirection(json.current.wind_deg);
       let pressure = Math.round(json.current.pressure * 0.750064);
       let humidity = json.current.humidity;
       let chanceRain = json.hourly[1].pop;
       let icon = determinationIcon(json.current.weather[0].id);

       showWeather(temp, desc, windSpeed, windDir, pressure, humidity, chanceRain, icon);
   });
}

function saveCoords(obj) {
    localStorage.setItem('currentGeoLocation', JSON.stringify(obj));
}

function geoSuccessHandler(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
        latitude: lat,
        longitude: lon,
    } 
    saveCoords(coordsObj);
    getWeather(lat, lon);
    getCityName(lat, lon);
};

function geoErrorHandler() {
    alert(`Доступ к местоположению запрещён настройками браузера. Мы покажем вам погоду в Москве.`)

    const lat = "55.753215";
    const lon = "37.622504";
    const coordsObj = {
        latitude: lat,
        longitude: lon,
    } 
    saveCoords(coordsObj);
    getWeather(lat, lon);
    getCityName(lat, lon);
};

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
};

function getCoords() {
    const currentGeoLocation = localStorage.getItem('currentGeoLocation');

    if (currentGeoLocation === null) {
        askForCoords();
    } else {
        const loadedCoords = JSON.parse(currentGeoLocation);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
        getCityName(loadedCoords.latitude, loadedCoords.longitude);
    }
};

function CityDefinition() {
    const btnCityDefinition = document.querySelector('.js-city-definition')

    btnCityDefinition.addEventListener('click', () => {
        askForCoords()
    });
};

function init() {
    setStartUnits()
    getCoords();
    citySelection();
    CityDefinition();
};

init();