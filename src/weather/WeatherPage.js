import { useParams } from 'react-router-dom';

const WeatherPage = ({ data }) => {
    const { id } = useParams();
    const location = data.find(l => (l.id).toString() === id);
    return (
        <div className="weatherPage">
            <h1>{location.city}</h1>
        </div>
    );
}

export default WeatherPage;