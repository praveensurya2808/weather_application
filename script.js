function getWeather(){
    const apiKey = '22f3fb558fc0f5db9ab0bf99f070d3a6';
    const city = document.getElementById('city').value;
    if(!city){
        alert('please enter the city')
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then(Response => Response.json())
        .then(data=> {
            displayWeather(data);
        })
        .catch(error=>{
            console.error('error fetching the weather data:',error);
            alert('Error fetching the current weather data . please try again');
        });
    fetch(forecastUrl)
        .then(Response => Response.json())
        .then(data =>{
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error('error fetching the hourly forecasting  data:', error);
            alert('Error fetching the hourly forecasting data . please try again');
        });   
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if(data.cod==='404'){
        weatherInfoDiv.innerHTML =`<P>${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp-273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl  = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const temperatureHTML = `<P>${temperature}°C</p>`;
        const weatherHTML = `<P>${cityName}</P>
                            <P>${description}</p>`;
        tempDivInfo.innerHTML=temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}
    
    function displayHourlyForecast(hourlyData){
        const hourlyForecastDiv= document.getElementById('hourly-forecast');
        const next24hours = hourlyData.slice(0,8)
        next24hours.forEach(item =>{
                const dateTime = new Date(item.dt *1000);
                const hour = dateTime.getHours();
                const temperature = Math.round(item.main.temp-273.15);
                const iconCode = item.weather[0].icon;
                const iconUrl =`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                const hourlyItemHtml =`
                        <div class="hourly-item">
                            <span>${hour}:00</span>
                            <img src="${iconUrl}" alt="Hourly waether Icon"
                            <span>${temperature}°C</span>
                        </div>
                        `;
                hourlyForecastDiv.innerHTML +=hourlyItemHtml;

        });
    }

    function showImage(){
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display='block'
    }


