import geoApi from './geoApi/geoApi';
import { useState, useEffect } from 'react';
import LocationForm from './locationPage/LocationForm';
import LocationList from './locationPage/LocationList';
import Header from './static/Header';
import Feed from './home/Feed';
import { Route, Switch, useHistory } from 'react-router-dom';

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
 * 
 */
function App() {
  const history = useHistory();

  const [geoData, setGeoData] = useState([]);
  const [locations, setLocations] = useState(
    [
      {
        id: "1",
        city:"Toronto",
        state:"Ontario",
        country:"Canada",
        temp:"24",
        condition:"partly cloudy"
      },
      {
        id: "2",
        city:"New York",
        state:"New York",
        country:"USA",
        temp:"25",
        condition:"sunny"
      }
    ]
  );

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;
  
  const goHome = () => {
    history.push("/");
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

  return (
    <div className="App">
      <Header title="World Weather" goHome={goHome}/>
      <Switch>
        <Route exact path="/">
          <button id="addLocationButton" onClick={() => history.push("/add-location")}>Add Location</button>
          <Feed locations={locations}/>
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
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
