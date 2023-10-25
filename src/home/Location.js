import WeatherIcon from "../other/WeatherIcon";
const Location = ({ id, city, state, country, temp, condition, description, sunrise, sunset, toWeatherPage, isMetric }) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const sunOut = (currentTime - sunrise >= 0) && (sunset - currentTime >= 0);

    return (
        <div className="location" onClick={() => toWeatherPage(id)}>  
            <div className="locationCity">
                <h1 style={{marginLeft:"10px", marginTop: "10px",paddingTop: "0px", marginBottom:"0px"}}>{city}</h1>
                <p style={{marginLeft:"10px", paddingTop: "0px", marginBottom:"0px"}}>{`${state}, ${country}`}</p>
            </div>
            <div className="locationTemp">
                <h1 style={{textAlign:"right", margin:0}}>{`${temp}\u00B0${isMetric ? 'C' : 'F'}`}</h1>
            </div>
            <WeatherIcon condition={condition} description={description} sunOut={sunOut} width={10} height={100} margin={0}/>
        </div>
    );
}

export default Location;