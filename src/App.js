import geoApi from './geoApi/geoApi';
import { useState, useEffect } from 'react';
import LocationForm from './locationPage/LocationForm';
import LocationList from './locationPage/LocationList';
import Header from './static/Header';
import Feed from './home/Feed';
import { Route, Switch, useHistory } from 'react-router-dom';
import dailyWeatherApi from './dailyWeatherApi/dailyWeatherApi';
import WeatherPage from './weather/WeatherPage';

/**
 * TODO:
 * - Add imperical units for pressure, wind, and visibility
 * - Capitalize condition description
 * - Reduce CSS repitition
 * - Deal with undefined states
 * - Make sure form submits when pressing enter
 */

function App() {
  const history = useHistory();

  const [geoData, setGeoData] = useState([]);
  const [locations, setLocations] = useState([]);
  //Leaving this here in case I need to debug
  /*const [locations, setLocations] = useState(
    [
      {
        id: 1,
        city:"Toronto",
        state:"Ontario",
        country:"Canada",
        lat: 43.653225,
        long: -79.383186,
        temp: 0,
        tempFar: 0,
        feelsLike: 0,
        feelsLikeFar: 0,
        condition:"",
        description: "",
        sunrise: 0,
        sunset: 0,
        pressure: 0,
        humidity: 0,
        windSpeed: 0,
        windDir: 0,
        visibility: 0,
        offset: 0
      },
      {
        id: 2,
        city:"New York",
        state:"New York",
        country:"USA",
        lat: 40.712776,
        long: -74.005974,
        temp: 0,
        tempFar: 0,
        feelsLike: 0,
        feelsLikeFar: 0,
        condition:"",
        description: "",
        sunrise: 0,
        sunset: 0,
        pressure: 0,
        humidity: 0,
        windSpeed: 0,
        windDir: 0,
        visibility: 0,
        offset: 0
      }
    ]
  );*/


  const [locationsCopy, setLocationsCopy] = useState([]); //weird workaround to prevent infinite loop in handleSubmit by updating locations

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMetric, setIsMetric] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;
  
  const goHome = () => {
    history.push("/");
  }

  const toWeatherPage = (id) => {
    history.push(`weather/${id}`);
  }

  const toFahrenheit = (temp) => {
    return parseInt((temp * (9 / 5)) + 32);
  }

  const locationAdded = (lat, long) => {
    for(let i = 0; i < locations.length; i++){
      if(locations[i].lat === lat && locations[i].long === long){
        return true;
      }
    }
    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await geoApi.get(`/direct?q=${city},${state},${country}&limit=5&appid=${apiKey}`)
      const responseData = response.data;
      for(let i = 0; i < responseData.length; i++){
        delete responseData[i].local_names;
        responseData[i].locationAdded = locationAdded(responseData[i].lat, responseData[i].lon);
      }
      setGeoData(responseData);
    }catch(err){
      console.log(err.message);
    }
  }

  const getDailyWeather = async () => {
    const locations2 = [...locationsCopy];

    for(let i = 0; i < locationsCopy.length; i++){
      try{
        const response = await dailyWeatherApi.get(`/weather?lat=${locationsCopy[i].lat}&lon=${locationsCopy[i].long}&appid=${apiKey}`)
        const responseData = response.data;
        locations2[i].temp = parseInt(responseData["main"]["temp"] - 273.15);
        locations2[i].tempFar = toFahrenheit(responseData["main"]["temp"] - 273.15);
        locations2[i].condition = responseData["weather"][0]["main"];
        locations2[i].description = responseData["weather"][0]["description"];
        locations2[i].feelsLike = parseInt(responseData["main"]["feels_like"] - 273.15);
        locations2[i].feelsLikeFar = toFahrenheit(responseData["main"]["feels_like"] - 273.15);
        locations2[i].sunrise = responseData["sys"]["sunrise"];
        locations2[i].sunset = responseData["sys"]["sunset"];
        locations2[i].pressure = responseData["main"]["pressure"];
        locations2[i].humidity = responseData["main"]["humidity"];
        locations2[i].windSpeed = responseData["wind"]["speed"];
        locations2[i].windDir = responseData["wind"]["deg"];
        locations2[i].visibility = Math.round((responseData["visibility"] / 1000) * 100) / 100;
        locations2[i].offset = responseData["timezone"];
        //locations2[i].condition = "Sno";
        //locations2[i].description = "few clouds"
      }catch(err){
        console.log(err.message);
      }
    }
    setLocations(locations2);
  }

  const handleDelete = (id) => {
    const newLocations = [];
    for(let i = 0; i < locations.length; i++){
      if(locations[i].id !== id){
        newLocations.push(locations[i]);
      }
    }
    localStorage.setItem('locationList', JSON.stringify(newLocations));
    setLocationsCopy(newLocations);
    setDeleteClicked(false);
    history.push("/");
  } 

  useEffect(() => {
    setLocationsCopy(JSON.parse(localStorage.getItem('locationList')));
  }, []);

  useEffect(() => {
    getDailyWeather();
  }, [locationsCopy])

  const toAddLocationPage = () => {
    history.push("/add-location");
    setGeoData([]);
  }

  const addLocation = (city, state, country, lat, long) => {
    const newLocation = {
      id: locations.length > 0 ? locations[locations.length-1].id + 1 : 0,
      city: city,
      state: state,
      country: country,
      lat: lat,
      long: long,
      temp: 0,
      tempFar: 0,
      feelsLike: 0,
      feelsLikeFar: 0,
      condition:"",
      description: "",
      sunrise: 0,
      sunset: 0,
      pressure: 0,
      humidity: 0,
      windSpeed: 0,
      windDir: 0,
      visibility: 0,
      offset: 0
    }
    const updatedLocations = [...locations, newLocation];
    localStorage.setItem('locationList', JSON.stringify(updatedLocations));
    setLocationsCopy(updatedLocations);
    setSearchTerm('');
    history.push("/");
  }

  return (
    <div className="App">
      <Header title="World Weather" goHome={goHome}/>
      <Switch>
        <Route exact path="/">
          <input type="text" id="locationSearch" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Locations"></input>
          <button id="addLocationButton" onClick={() => toAddLocationPage()}>Add Location</button>
          <button 
            className="unitToggle" 
            onClick={() => setIsMetric(true)} 
            style={{backgroundColor: isMetric ? "#070e2b" : "white", color: !isMetric ? "#070e2b" : "white"}}
          >
              Metric
          </button>
          <button 
            className="unitToggle" 
            onClick={() => setIsMetric(false)} 
            style={{marginLeft: "0px", backgroundColor: !isMetric ? "#070e2b" : "white", color: isMetric ? "#070e2b" : "white"}}
          >
            Imperial
          </button>
          <Feed 
            locations={locations.filter(location => ((location.city).toLowerCase()).includes(searchTerm.toLowerCase()))} 
            toWeatherPage={toWeatherPage}
            isMetric={isMetric}
          />
        </Route>
        <Route exact path="/add-location">
          <LocationForm
            setCity = {setCity}
            setState = {setState}
            setCountry = {setCountry}
            handleSubmit = {handleSubmit}
            goHome = {goHome}
          />
          <LocationList
            data = {geoData}
            addLocation={addLocation}
          />
        </Route>
        <Route exact path="/weather/:id">
          <WeatherPage 
            data={locations} 
            handleDelete={handleDelete} 
            deleteClicked={deleteClicked} 
            setDeleteClicked={setDeleteClicked} 
            goHome={goHome} 
            isMetric={isMetric}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
