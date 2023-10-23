import Location from "./Location";

const Feed = ({ locations, toWeatherPage }) => {
    return(
        <div className="feed">
            {locations.map(location => (
                <Location 
                    id={location.id}
                    city={location.city}
                    state={location.state}
                    country={location.country}
                    temp={location.temp}
                    condition={location.condition}
                    description={location.description}
                    sunrise={location.sunrise}
                    sunset={location.sunset}
                    toWeatherPage={toWeatherPage}
                />
            ))}
        </div>
    )
}

export default Feed;