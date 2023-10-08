const LocationSearchResult = ({ city, state, country, lat, long, addLocation }) => {
    return (
        <div className="locationSearchResult">
            <div className="locationSearchResultText">
                <h2 style={{marginLeft:"10px"}}>{`${city}, ${state}, ${country}`}</h2>
            </div>
            <button className="locationSearchResultButton" onClick={() => addLocation(city, state, country, lat, long)}>Add</button>
        </div>
    )
}

export default LocationSearchResult;