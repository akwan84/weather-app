import geoApi from './geoApi/geoApi';
import { useState, useEffect } from 'react';
import LocationForm from './LocationForm';
import LocationList from './LocationList';

/**
 * TODO:
 * - Create the main page
 *    - Header
 *    - Navigation Bar
 *      - Add location/search page
 *      - View more details of weather
 *    - Clickable Locations
 * 
 * 
 */
function App() {
  const [geoData, setGeoData] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;
  
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

  /*return (
    <div className="App">
      <LocationForm
        setCity = {setCity}
        setState = {setState}
        setCountry = {setCountry}
        handleSubmit = {handleSubmit}
      />
      <LocationList
        data = {geoData}
      />
    </div>
  );*/

  return (
    <div className="App">
      
    </div>
  )
}

export default App;
