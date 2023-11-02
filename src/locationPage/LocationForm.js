const LocationForm = ({ handleSubmit, setCity, setState, setCountry, goHome }) => {
    return(
        <div>
            <form className="locationForm" onSubmit={(e) => handleSubmit(e)}>
                <label className="locationFormLabel">City</label>
                <br/>
                <input id="city" onChange={(e) => {setCity(e.target.value)}}></input>
                <br/>
                <label className="locationFormLabel">State (If Applicable)</label>
                <br/>
                <input id="state" onChange={(e) => {setState(e.target.value)}}></input>
                <br/>
                <label className="locationFormLabel">Country</label>
                <br/>
                <input id="country" onChange={(e) => {setCountry(e.target.value)}}></input>
                <br/>
                <button className="locationPageButton" id="goHomeLocationPage" onClick={() => goHome()}>Home</button>
                <button className="locationPageButton" id="locationFormSubmit" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LocationForm;