import Location from "./Location";

const Feed = ({ locations, toWeatherPage, isMetric }) => {
    return(
        <div className="feed">
            {locations.map(location => (
                <Location 
                    id={location.id}
                    city={location.city}
                    state={location.state}
                    country={location.country}
                    temp={isMetric ? location.temp : location.tempFar}
                    condition={location.condition}
                    description={location.description}
                    sunrise={location.sunrise}
                    sunset={location.sunset}
                    toWeatherPage={toWeatherPage}
                    isMetric={isMetric}
                />
            ))}
        </div>
    )
}

export default Feed;