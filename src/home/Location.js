import WeatherIcon from "../other/WeatherIcon";
const Location = ({ id, city, state, country, temp, condition, description, toWeatherPage }) => {
    return (
        <div className="location" onClick={() => toWeatherPage(id)}>  
            <div className="locationCity">
                <h1 style={{marginLeft:"10px", marginTop: "10px",paddingTop: "0px", marginBottom:"0px"}}>{city}</h1>
                <p style={{marginLeft:"10px", paddingTop: "0px", marginBottom:"0px"}}>{`${state}, ${country}`}</p>
            </div>
            <div className="locationTemp">
                <h1 style={{textAlign:"right", margin:0}}>{`${temp}\u00B0C`}</h1>
            </div>
            <WeatherIcon condition={condition} description={description} width={10} height={100} margin={0}/>
            
        </div>
    );
}

export default Location;