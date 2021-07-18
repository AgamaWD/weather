//ОКРУГЛЕНИЕ ДО ДЕСЯТЫХ

function roundNum(num) {
    return Math.round(num * 10) / 10;
 };
 
//ПЕРЕВОД ГРАДУСОВ НАПРАВЛЕНИЯ ВЕТРА В СЛОВА

function determinationDirection(deg) {
    let direction = '';

    if(deg >= 0 && deg <= 22.5 || deg >= 337.5 && deg <= 360) {
        direction = 'северный'
    } else if(deg > 22.5 && deg < 67.5) {
        direction = 'северо-восточный'
    } else if(deg >= 67.5 && deg <= 112.5) {
        direction = 'восточный'
    } else if(deg > 112.5 && deg < 157.5) {
        direction = 'юго-восточный'
    } else if(deg >= 157.5 && deg <= 202.5) {
        direction = 'южный'
    } else if(deg > 202.5 && deg < 247.5) {
        direction = 'юго-западный'
    } else if(deg >= 247.5 && deg <= 292.5) {
        direction = 'западный'
    } else if(deg > 292.5 && deg < 337.5) {
        direction = 'северо-западный'
    } 

    return direction
}
 
//ОПРЕДЕЛЕНИЕ ИКОНКИ ПО КОДУ ПОГОДНЫХ УСЛОВИЙ

function determinationIcon(id) {
    let iconName = ''

    if(id == 800) {
        iconName = 'sun'
    } else if(id == 801) {
        iconName = 'little-cloudy'
    } else if(id == 802) {
        iconName = 'partly-cloudy'
    } else if(id >= 803 && id <= 804) {
        iconName = 'cloud'
    } else if(id == 310 || id == 520) {
        iconName = 'shine-rain'
    } else if(id >= 300 && id <= 302 || id >= 311 && id <= 321 || id >= 500 && id <= 511 || id >= 521 && id <= 531) {
        iconName = 'rain'
    } else if(id >= 611 && id <= 616) {
        iconName = 'snow-rain'
    } else if(id >= 600 && id <= 602 || id >= 620 && id <= 622) {
        iconName = 'snow'
    } else if(id == 200 || id == 210 || id == 230 || id == 231) {
        iconName = 'low-storm'
    } else if(id == 201 || id == 202 || id == 211 || id == 212 || id == 221 || id == 232) {
        iconName = 'storm'
    } else if(id == 701 || id == 721 || id == 741) {
        iconName = 'fog'
    }  else if(id == 711 || id >= 751 && id <= 762) {
        iconName = 'sad'
    } else if(id == 731 || id == 771 || id == 781) {
        iconName = 'hurricane'
    }

    return iconName
}

//ОПРЕДЕЛЕНИЕ ЕДИНИЦ ИЗМЕРЕНИЯ ТЕМПЕРАТУРЫ

const toggleUnits = document.querySelectorAll('.js-units_toggle');

function getUnits() {
    let unit = ''
    toggleUnits.forEach(el => {
        if(el.checked) { 
           unit = el.value;
        }
    }) 
    return unit;
}

function askUnits() {
    const unitsLS = localStorage.getItem('tempUnits');
    
    if(unitsLS === null) {
        tempUnits = getUnits();
   } else {
       tempUnits = unitsLS
   }

   return tempUnits
}

function saveUnits(units) {   
    localStorage.setItem('tempUnits', units);    
}

function setStartUnits() {
    const unitsLS = localStorage.getItem('tempUnits');
    
    if(unitsLS === null || unitsLS == 'C') {
        document.getElementById('C').checked = true;
   } else {
        document.getElementById('F').checked = true;
   }

}

toggleUnits.forEach(el => {
    el.addEventListener('change', () => {
        saveUnits(getUnits())
        init()
    })
})