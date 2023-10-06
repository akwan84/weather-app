import Location from "./Location";

const Feed = ({ locations }) => {
    return(
        <div className="feed">
            {locations.map(location => (
                <Location 
                    city={location.city}
                    state={location.state}
                    country={location.country}
                />
            ))}
        </div>
    )
}

export default Feed;