import { useParams } from 'react-router-dom';
import Forecast from './Forecast';
import ConditionWidget from './ConditionWidget';

const WeatherPage = ({ data, handleDelete, deleteClicked, setDeleteClicked, goHome, isMetric }) => {
    const degreeToCompassDirection = (degree) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degree / 45) % 8; // Map degrees to index
        return directions[index];
    }

    const { id } = useParams();
    const location = data.find(l => (l.id).toString() === id);

    if(location === undefined) {
        goHome();
        return;
    }

    const sunriseTime = new Date((location.sunrise + location.offset) * 1000);
    const sunsetTime = new Date((location.sunset + location.offset) * 1000);

    const sunriseTimeInAMPM = `${sunriseTime.getUTCHours() % 12 || 12}:${sunriseTime.getUTCMinutes().toString().padStart(2, '0')} ${sunriseTime.getUTCHours() >= 12 ? 'PM' : 'AM'}`;
    const sunsetTimeInAMPM = `${sunsetTime.getUTCHours() % 12 || 12}:${sunsetTime.getUTCMinutes().toString().padStart(2, '0')} ${sunsetTime.getUTCHours() >= 12 ? 'PM' : 'AM'}`;

    const capitalizedDescription = location.description.charAt(0).toUpperCase() + location.description.slice(1);

    const direction = degreeToCompassDirection(location.windDir);
    return (
        <>
        {!deleteClicked ? 
            <div className="weatherPage">
                <div className="weatherPageHeader">
                    <h1 className="weatherPageH1">{location.city}</h1>
                    {location.state && <h3 className="weatherPageH3">{`${location.state}, ${location.country}`}</h3>}
                    {!location.state && <h3 className="weatherPageH3">{`${location.country}`}</h3>}
                </div>
                <div className="weatherPageTemperature">
                    <h1 className="weatherPageH1">{`${isMetric ? location.temp : location.tempFar}\u00B0${isMetric ? 'C' : 'F'}`}</h1>
                    <h3 className="weatherPageH3">{`Feels Like: ${isMetric ? location.feelsLike : location.feelsLikeFar}\u00B0${isMetric ? 'C' : 'F'}`}</h3>
                </div>
                <div className="weatherPageCondition">
                    <h1 className="weatherPageH1">{location.condition}</h1>
                    <h3 className="weatherPageH3">{capitalizedDescription}</h3>
                </div>
                <Forecast lat={location.lat} long={location.long} isMetric={isMetric}/>
                <br/>
                <div className="conditionHeader">
                    <h1 className="weatherPageH1" style={{marginLeft:"0.5%"}}>Conditions</h1>
                </div>
                <div className="currentConditions">
                    <ConditionWidget icon="weatherPageIcon sunriseIcon" condition="Sunrise" value={sunriseTimeInAMPM}/>
                    <ConditionWidget icon="weatherPageIcon sunsetIcon" condition="Sunset" value={sunsetTimeInAMPM}/>
                    <ConditionWidget icon="weatherPageIcon pressureIcon" condition="Pressure" value={isMetric ? `${location.pressure} hPa` : `${location.pressureImp} PSI`}/>
                </div>
                <div className="currentConditions">
                    <ConditionWidget icon="weatherPageIcon humidityIcon" condition="Humidity" value={`${location.humidity} %`}/>
                    <ConditionWidget icon="weatherPageIcon windConditionIcon" condition="Wind" value={isMetric ? `${Math.round(location.windSpeed * 3.6 * 100) / 100} km/h ${direction}` : `${Math.round(location.windSpeed * 2.237 * 100) / 100} mph ${direction}`}/>
                    <ConditionWidget icon="weatherPageIcon visibilityIcon" condition="Visibility" value={isMetric ? `${location.visibility} km` : `${location.visibilityImp} mi`}/>
                </div>
                <button className="weatherPageButton weatherPageHomeButton" onClick={() => goHome()}>Home</button>
                <button className="weatherPageButton deleteButton" onClick={() => setDeleteClicked(true)}>Delete</button>
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