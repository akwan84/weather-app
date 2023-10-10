import { useParams } from 'react-router-dom';
import Forecast from './Forecast';

const WeatherPage = ({ data }) => {
    const { id } = useParams();
    const location = data.find(l => (l.id).toString() === id);
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
        </div>
    );
}

export default WeatherPage;