const LocationForm = ({ handleSubmit, setCity, setState, setCountry, goHome }) => {
    return(
        <div>
            <form className="locationForm">
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
            </form>
            <button className="locationPageButton" id="goHomeLocationPage" onClick={() => goHome()}>Home</button>
            <button className="locationPageButton" id="locationFormSubmit" onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}

export default LocationForm;