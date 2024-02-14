// <!--
//  Author's Name: Aaditya Parajuli
//  Student ID: 2357526
// -->

document.addEventListener("DOMContentLoaded", function () {

    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");

    var defaultCity = "Zhezkazgan";
    fetchWeatherData(defaultCity);

    function searchWeather() {
        const city = locationInput.value.trim();

        if (city !== "") {
            fetchWeatherData(city);
        } else {
            alert("Please enter a city name.");
        }
    }

    searchButton.addEventListener("click", searchWeather);

    locationInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchWeather();
        }
    });

     
     function fetchWeatherData(city) {
        const apiKey = "d68840f8f3425a2e27ee32abffd88623";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                updateWeatherData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("Error fetching weather data:", error);
            });
    }
        
    
    
    function updateWeatherData(data) {
      
        const cityName = document.getElementById("cityName");
        const dateTime = document.getElementById("dateTime");
        const temperature = document.getElementById("temperature");
        const windspeed = document.getElementById("windspeed");
        const humidity = document.getElementById("humidity");
        const pressure = document.getElementById("pressure");
        const weatherIcon = document.getElementById("weatherIcon");
        const weatherCondition = document.getElementById("weatherCondition");

        
        cityName.textContent = data.name;
        dateTime.textContent = getCurrentDateTime(data.timezone);
        temperature.textContent = data.main.temp;
        windspeed.textContent = data.wind.speed;
        humidity.textContent = data.main.humidity;
        pressure.textContent = data.main.pressure;
        weatherCondition.textContent = data.weather[0].description;

        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqy4Znl_IOs61nSORtE0WkA4iKYH4smpRGfhQpEWnraMxMnKFf6USUd96gg&s`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].main;

        
        const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
        temperature.textContent = `${temperatureCelsius} °C`;

        
        const windspeedMetersPerSecond = data.wind.speed;
        windspeed.textContent = `${windspeedMetersPerSecond} m/s`;

        
        const humidityPercentage = data.main.humidity;
        humidity.textContent = `${humidityPercentage} %`;

        
        const pressureHpa = data.main.pressure;
        pressure.textContent = `${pressureHpa} hPa`;
      }

      async function weatherPastData() {
        const response = await fetch('http://');
        const text = await response.text();
        const data = JSON.parse(text);
        console.log(data);
    
        let table = document.querySelector("#WeatherData");
        let tbody = table.querySelector("#weatherInfo");
    
        var k = 0;
        for (let i = 0; i < data.length - 1; i++) {
            let row = tbody.insertRow(k);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
    
            cell1.innerHTML = data[i].Day_and_Date;
            cell2.innerHTML = data[i].Day_of_week;
            cell3.innerHTML = `<img src="https://openweathermap.org/img/w/${data[i].Weather_Icon}.png" height="40px" >`;
            cell4.innerHTML = Math.round(data[i].Temperature) + " °C";
            cell5.innerHTML = data[i].Pressure + "Pa";
            cell6.innerHTML = data[i].Wind_Speed + "m/s";
            cell7.innerHTML = data[i].Humidity + "%";
        }
    }
    
    

        
        function getCurrentDateTime(timezone) {
          const timestamp = Math.floor(Date.now() / 1000) + timezone;
          const date = new Date(timestamp * 1000);


   
        return date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "UTC",
        });
        }
    });


    