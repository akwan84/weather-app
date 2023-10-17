import { useParams } from 'react-router-dom';
import Forecast from './Forecast';
import ConditionWidget from './ConditionWidget';

const WeatherPage = ({ data, handleDelete, deleteClicked, setDeleteClicked}) => {
    const degreeToCompassDirection = (degree) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degree / 45) % 8; // Map degrees to index
        return directions[index];
    }

    const { id } = useParams();
    const location = data.find(l => (l.id).toString() === id);
    const sunriseTime = new Date(location.sunrise * 1000);
    const sunsetTime = new Date(location.sunset * 1000);

    const sunriseTimeInAMPM = `${sunriseTime.getHours() % 12 || 12}:${sunriseTime.getMinutes().toString().padStart(2, '0')} ${sunriseTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    const sunsetTimeInAMPM = `${sunsetTime.getHours() % 12 || 12}:${sunsetTime.getMinutes().toString().padStart(2, '0')} ${sunsetTime.getHours() >= 12 ? 'PM' : 'AM'}`;

    const direction = degreeToCompassDirection(location.windDir);
    return (
        <>
        {!deleteClicked ? 
            <div className="weatherPage">
                <div className="weatherPageHeader">
                    <h1 className="weatherPageH1">{location.city}</h1>
                    <h3 className="weatherPageH3">{`${location.state}, ${location.country}`}</h3>
                </div>
                <div className="weatherPageTemperature">
                    <h1 className="weatherPageH1">{`${location.temp}\u00B0C`}</h1>
                    <h3 className="weatherPageH3">{`Feels Like: ${location.feelsLike}\u00B0C`}</h3>
                </div>
                <div className="weatherPageCondition">
                    <h1 className="weatherPageH1">{location.condition}</h1>
                    <h3 className="weatherPageH3">{location.description}</h3>
                </div>
                <Forecast lat={location.lat} long={location.long}/>
                <br/>
                <div className="conditionHeader">
                    <h1 className="weatherPageH1" style={{marginLeft:"0.5%"}}>Conditions</h1>
                </div>
                <div className="currentConditions">
                    <ConditionWidget icon="sunriseIcon" condition="Sunrise" value={sunriseTimeInAMPM}/>
                    <ConditionWidget icon="sunsetIcon" condition="Sunset" value={sunsetTimeInAMPM}/>
                    <ConditionWidget icon="pressureIcon" condition="Pressure" value={`${location.pressure} hPa`}/>
                </div>
                <div className="currentConditions">
                    <ConditionWidget icon="humidityIcon" condition="Humidity" value={`${location.humidity} %`}/>
                    <ConditionWidget icon="windConditionIcon" condition="Wind" value={`${parseInt(location.windSpeed * 3.6)} km/h ${direction}`}/>
                    <ConditionWidget icon="visibilityIcon" condition="Visibility" value={`${location.visibility} km`}/>
                </div>
                <button className="deleteButton" onClick={() => setDeleteClicked(true)}>Delete</button>
            </div>
        : 
            <div className='deleteVerification'>
                <div className='innerDeleteVerification'>
                    <p style={{fontSize:"2vh"}}>Are you sure you want to delete this location?</p>
                    <button className="deleteVerificationButton" onClick={() => handleDelete(location.id)}>Yes</button>
                    <button className="deleteVerificationButton" style={{marginLeft:"10%"}} onClick={() => setDeleteClicked(false)}>No</button>
                </div>
            </div> 
        }
        </>
    );
}

export default WeatherPage;