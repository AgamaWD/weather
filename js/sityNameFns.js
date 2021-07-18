//ВЫВОД НАЗВАНИЯ ГОРОДА НА ЭКРАН

function showCity(cityName) {
    const cityString = document.querySelector('.js-city-name');
    cityString.innerHTML = cityName;
}

//ПОЛУЧЕНИЕ НАЗВАНИЯ ГОРОДА ПО КООРДИНАТАМ

function getCityName(lat, lon) {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    const token = "da4ca2038ab8d81561c92c35f512b90e25982689";
    const query = { lat: lat, lon: lon, count: 1 };

var options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify(query)
}

let cityName = ''

fetch(url, options)
.then(response => {
    return response.json();
})
.then(json => {
    if(json.suggestions[0].data.city) {
        cityName = json.suggestions[0].data.city;
    } else if(json.suggestions[0].data.settlement) {
        cityName = json.suggestions[0].data.settlement;
    }
    showCity(cityName)
})
.catch(() => {
    cityName = 'Погода в вашем городе'
    showCity(cityName)
}) 
}

//ПОИСК ГОРОДА И КООРДИНАТ ПО НАЗВАНИЮ

const searchBlock = document.querySelector('.js-search')

function searchCity() {
    const searchLine = document.querySelector('.js-search-line')
    const list = document.querySelector('.js-list')
    const btnOk = document.querySelector('.js-search-ok')

    searchLine.focus()

    fetch('json/cities_russia.json', {
        method : 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        let citiesList = json.cities;

        document.addEventListener('click', outsideClick);

        searchLine.addEventListener('input', () => {
            let searchValue = searchLine.value;
    
            if(!searchValue) return;
    
            searchValue = searchValue[0].toUpperCase() + searchValue.slice(1);
            
            list.innerHTML = '';
            let count = 0;
    
            for(i=0; i < citiesList.length; i++) {
                if(citiesList[i].city.startsWith(searchValue)) {

                    if(citiesList[i].city === searchValue) break

                    let option = document.createElement('option')
                    option.innerText = citiesList[i].city
                    list.appendChild(option)
                    count++
                    if(count == 5) {
                        break
                    }
                }
            }
        });

        btnOk.addEventListener('click', () => {
            let selectedCity = searchLine.value;
    
            if(selectedCity) {

                selectedCity = selectedCity[0].toUpperCase() + selectedCity.slice(1);

                for(i=0; i < citiesList.length; i++) {
                    if(citiesList[i].city == selectedCity) {
                        let lat = citiesList[i].lat;               
                        let lon = citiesList[i].lng;
                        let coordsObj = {
                            latitude: lat,
                            longitude: lon,
                        } 
                        saveCoords(coordsObj);
                        getWeather(lat, lon);
                        getCityName(lat, lon);
                        searchLine.value = '';
                        searchBlock.classList.remove('active')
                        console.log(citiesList[i].city)
                        break
                    } else {
                        continue
                    }
                }
            } else {
                searchBlock.classList.remove('active')
                console.log('Город не выбран')
                return
            }
    
        });
    })       
    .catch(()=> {
        alert('Данная функция сейчас недоступна.')
    }) 
}

//ОБРАБОТЧИК КЛИКА КНОПКИ "СМЕНИТЬ ГОРОД", ЗАПУСК ПОИСКА

function citySelection() {
    const btnCitySelection = document.querySelector('.js-city-selection');

    btnCitySelection.addEventListener('click', () => {
        searchBlock.classList.add('active')
        searchCity()
    });
} 

// КЛИК НЕ ПО ЭЛЕМЕНТУ

function outsideClick(e) {
    const elClass = '.js-search';
    const targetEl = e.target;
    const targetParent = targetEl.closest(elClass);

    if(!targetEl.classList.contains(elClass) && targetParent === null) {
        searchBlock.classList.remove('active')
        console.log('Город не выбран')
        document.removeEventListener('click', outsideClick)
    }
}