const LocationSearchResult = ({ city, state, country, addLocation }) => {
    return (
        <div className="locationSearchResult">
            <div className="locationSearchResultText">
                <h2 style={{marginLeft:"10px"}}>{`${city}, ${state}, ${country}`}</h2>
            </div>
            <button className="locationSearchResultButton" onClick={() => addLocation(city, state, country)}>Add</button>
        </div>
    )
}

export default LocationSearchResult;