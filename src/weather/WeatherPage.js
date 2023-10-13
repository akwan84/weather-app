import { useParams } from 'react-router-dom';
import Forecast from './Forecast';

const WeatherPage = ({ data }) => {
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
            <h3>Sunrise: {sunriseTimeInAMPM}</h3>
            <h3>Sunset: {sunsetTimeInAMPM}</h3>
            <h3>Pressure: {location.pressure}</h3>
            <h3>Humidity: {location.humidity}</h3>
            <h3>Wind: {location.windSpeed} {direction}</h3>
        </div>
    );
}

export default WeatherPage;