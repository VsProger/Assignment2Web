const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public')); 

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const apiKey = 'e3922e2135e031401dd622353423d5ab';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.get('/unsplash', async (req, res) => {
    try {
        const city = req.query.city; 
        const unsplashApiKey = 's34N4BqNHsbN1siOAh3w_myyANAhF824GZAr4NGWNig';
        const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&client_id=${unsplashApiKey}`;

        const response = await fetch(unsplashUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            res.json({ imageUrl });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
