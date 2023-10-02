const LocationForm = ({ handleSubmit, setCity, setState, setCountry }) => {
    return(
        <div>
            <form className="locationForm" onSubmit={(e) => handleSubmit(e)}>
                <input id="city" onChange={(e) => {setCity(e.target.value)}}></input>
                <input id="state" onChange={(e) => {setState(e.target.value)}}></input>
                <input id="country" onChange={(e) => {setCountry(e.target.value)}}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LocationForm;