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
                display.innerHTML = `Temperature in ${city}: ${data.main.temp}°C`;
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
    const clientId = 's34N4BqNHsbN1siOAh3w_myyANAhF824GZAr4NGWNig';

    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&client_id=${clientId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const imageUrl = data.results[0].urls.regular;
                document.getElementById('city-image').src = imageUrl;
            } else {
                // If no image is found, display a placeholder image or a message.
                document.getElementById('city-image').src = 'placeholder-image.jpg';
            }
        })
        .catch(error => console.error('Error:', error));
}
