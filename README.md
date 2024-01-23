# Weather Web Application

This web application allows you to get information about a city, including its weather, location on a map, city image, and additional information from Wikipedia.

## Prerequisites

Before running the application, you'll need the following:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

Follow these steps to run the web page on your localhost:

### Step 1: Clone the Repository

```bash
git clone https://github.com/VsProger/Assignment2Web
cd Assignment2Web
```
### Step 2: Install Dependencies

Open a terminal/command prompt in the project directory and run the following command to install the necessary Node.js packages:

```bash
npm install
```

### Step 3: Start the Server

Run the following command to start the Node.js server:

```bash
node server.js
```

### Step 4: Access the Web Page

Open your web browser and navigate to http://localhost:3000 to access the City Information web application.

### Usage

1. Enter the name of a city in the search input and click the "Search" button.
2. The web page will display the temperature in the city, a map showing the city's location, a photo of the city, and additional information about the city from Wikipedia.

### Dependencies:

* node-fetch@2
* express

### API's:

* OpenWeather
* Google Maps Geocoding
* Wikipedia
* Unsplash
