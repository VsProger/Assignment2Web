let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;

    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            const display = document.getElementById('weather-data');
            if(data.main) {
                fetchWeatherData(city);
                updateMapForCity(city);
                getWikipediaInfo(city);
            } else {
                display.innerHTML = `City not found. Please try again.`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});




function fetchWeatherData(city) {
    const apiKey = 'e3922e2135e031401dd622353423d5ab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = {
                temperature: `${data.main.temp}°C`,
                description: data.weather[0].description,
                iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                coordinates: `[${data.coord.lat}, ${data.coord.lon}]`,
                feelsLike: `${data.main.feels_like}°C`,
                humidity: `${data.main.humidity}%`,
                pressure: `${data.main.pressure} hPa`,
                windSpeed: `${data.wind.speed} m/s`,
                countryCode: data.sys.country,
                rainVolume: `${data.rain ? data.rain['1h'] || 0 : 0} mm (last 1 hour)`
            };

            displayWeatherData(weatherData);
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('City not found. Please try again.');
        });
}

function displayWeatherData(data) {
    const weatherDataContainer = document.getElementById('weather-data');
    weatherDataContainer.innerHTML = `
        <h2>Weather in ${document.getElementById('city-input').value}</h2>
        <p><strong>Temperature:</strong> ${data.temperature}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <img src="${data.iconUrl}" alt="Weather Icon">
        <p><strong>Coordinates:</strong> ${data.coordinates}</p>
        <p><strong>Feels Like:</strong> ${data.feelsLike}</p>
        <p><strong>Humidity:</strong> ${data.humidity}</p>
        <p><strong>Pressure:</strong> ${data.pressure}</p>
        <p><strong>Wind Speed:</strong> ${data.windSpeed}</p>
        <p><strong>Country Code:</strong> ${data.countryCode}</p>
        <p><strong>Rain Volume:</strong> ${data.rainVolume}</p>
    `;
}

function displayErrorMessage(message) {
    const weatherDataContainer = document.getElementById('weather-data');
    weatherDataContainer.innerHTML = `<p>${message}</p>`;
}


function updateMapForCity(city) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyB5Y_9cS7nUe_FSno453xY5I5Tg0ubpG2M`)
        .then(response => response.json())
        .then(data => {
            if(data.status === 'OK') {
                const location = data.results[0].geometry.location;
                map.setCenter(location);
                map.setZoom(10);
            }
        })
        .catch(error => console.error('Error:', error));
}

function getWikipediaInfo(city) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${encodeURIComponent(city)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const page = data.query.pages;
            const pageId = Object.keys(page)[0];
            const content = page[pageId].extract;
            document.getElementById('wikipedia-info').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}



function fetchCityImage(city) {
    fetch(`/unsplash?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.imageUrl) {
                document.getElementById('city-image').src = data.imageUrl;
            } else {
                
                document.getElementById('city-image').src = 'placeholder-image.jpg';
            }
        })
        .catch(error => console.error('Error:', error));
}

