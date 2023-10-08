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
 * - Static elements
 *    - Header
 *    - Footer (maybe)
 * - Create the main page
 *    - Button to add location
 *    - Search Bar
 *    - Clickable Locations
 * 
 * Potential Issues
 * - Feed size when shrinking page vertically
 * - Need the page to change when temperatures are still being fetched
 * 
 */
function App() {
  const history = useHistory();

  const [geoData, setGeoData] = useState([]);
  const [locations, setLocations] = useState(
    [
      {
        id: 1,
        city:"Toronto",
        state:"Ontario",
        country:"Canada",
        lat: 43.653225,
        long: -79.383186,
        temp: 0,
        condition:"",
        description: ""
      },
      {
        id: 2,
        city:"New York",
        state:"New York",
        country:"USA",
        lat: 40.712776,
        long: -74.005974,
        temp: 0,
        condition:"",
        description: ""
      }
    ]
  );

  const [locationsCopy, setLocationsCopy] = useState([]); //weird workaround to prevent infinite loop in handleSubmit by updating locations

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;
  
  const goHome = () => {
    history.push("/");
  }

  const toWeatherPage = (id) => {
    history.push(`weather/${id}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await geoApi.get(`/direct?q=${city},${state},${country}&limit=5&appid=${apiKey}`)
      const responseData = response.data;
      for(let i = 0; i < responseData.length; i++){
        delete responseData[i].local_names;
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
        locations2[i].condition = responseData["weather"][0]["main"];
        locations2[i].description = responseData["weather"][0]["description"];
        //locations2[i].condition = "Clouds";
        //locations2[i].description = "few clouds: 11-25%"
      }catch(err){
        console.log(err.message);
      }
    }
    setLocations(locations2);
  }

  useEffect(() => {
    setLocationsCopy(locations);
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
      id: locations[locations.length-1].id + 1, 
      city: city,
      state: state,
      country: country,
      lat: lat,
      long: long,
      temp: 0,
      condition: "sunny"
    }
    const updatedLocations = [...locations, newLocation];
    setLocationsCopy(updatedLocations);
    history.push("/");
  }

  return (
    <div className="App">
      <Header title="World Weather" goHome={goHome}/>
      <Switch>
        <Route exact path="/">
          <button id="addLocationButton" onClick={() => toAddLocationPage()}>Add Location</button>
          <Feed locations={locations} toWeatherPage={toWeatherPage}/>
        </Route>
        <Route exact path="/add-location">
          <LocationForm
            setCity = {setCity}
            setState = {setState}
            setCountry = {setCountry}
            handleSubmit = {handleSubmit}
          />
          <LocationList
            data = {geoData}
            addLocation={addLocation}
          />
        </Route>
        <Route exact path="/weather/:id">
          <WeatherPage/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
