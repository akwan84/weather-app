const LocationSearchResult = ({ city, state, country, lat, long, addLocation, locationAdded }) => {
    return (
        <div className="locationSearchResult">
            <div className="locationSearchResultText">
                {state && <h2 style={{marginLeft:"10px"}}>{`${city}, ${state}, ${country}`}</h2>}
                {!state && <h2 style={{marginLeft:"10px"}}>{`${city}, ${country}`}</h2>}
            </div>
            {!locationAdded && <button className="locationSearchResultButton" onClick={() => addLocation(city, state, country, lat, long)}>Add</button>}
        </div>
    )
}

export default LocationSearchResult;