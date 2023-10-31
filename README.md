# Weather App
This is a weather app that I created using ReactJS using the following 3 APIs from [openweathermap.org](openweathermap.org).

* [Geocoding](https://openweathermap.org/api/geocoding-api)
* [Current Weather](https://openweathermap.org/current)
* [5 Day Forecast](https://openweathermap.org/forecast5)

# Installation and Running
To install the project, you will require [Node Package Manager](https://www.npmjs.com/) (version shouldn't matter, but the version I am using is 8.15.0). With that installed, navigate to the root of the project folder and install the dependencies with 

```bash
npm install
```

Another thing you're going to need is an API key from OpenWeather, which you can do [here](https://openweathermap.org/price). Free tier is perfectly fine. 

With that key, first copy the `.env.example` file and name it `.env`:
```bash
cp .env.example .env
```
add the API key to the `REACT_APP_API_KEY` in `.env`.

Then to run the project:
```bash
npm start
```
which should provide you with a link to the webpage.
# Features
### Home Page
The home page features a few things:

* **Search Bar**: Search for the locations saved by the user
* **Add Location Button**: Goes to the page to add a new location to the feed
* **Imperial/Metric Toggle**: Toggle between imperial and metric units
* **Feed**: Saved locations showing the location, temperature, and weather condition

### Add Locations Page
On this page, a city, state/province, and country are provided as input to search for a new location. The top 5 search results are provided, and locations that have already been added can not be added again.

### Weather Page
Weather page for a particular location contains a series of important weather metrics including:

* Temperature
* Feels Like Temperature
* Condition
* 5 Day Forecast
* Sunrise and Sunset Time (in the city's timezone)
* Pressure
* Humidity
* Wind
* Visibility

Additionally, there is a delete button to remove the location from the feed