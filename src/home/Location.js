const Location = ({ city, state, country, temp, condition, description }) => {
    //still need partly cloudy icon condition
    return (
        <div className="location">  
            <div className="locationCity">
                <h1 style={{marginLeft:"10px", marginTop: "10px",paddingTop: "0px", marginBottom:"0px"}}>{city}</h1>
                <p style={{marginLeft:"10px", paddingTop: "0px", marginBottom:"0px"}}>{`${state}, ${country}`}</p>
            </div>
            <div className="locationTemp">
                <h1 style={{textAlign:"right", margin:0}}>{`${temp}\u00B0C`}</h1>
            </div>
            {
                (condition === 'Clear') ? 
                    <div className="sunnyIcon"/>
                : (condition === 'Clouds') ? 
                    (description === "few clouds: 11-25%") ? 
                        <div className="partlyCloudyIcon"/>
                    :
                        <div className="cloudyIcon"/>
                : (condition === 'Thunderstorm') ? 
                    <div className="thunderstormIcon"/>
                : (condition === "Drizzle" || condition === "Rain") ? 
                    <div className="rainIcon"/>
                : (condition === "Snow") ? 
                    <div className="snowIcon"/>
                :
                    <div className="windIcon"/>   
            }
            
        </div>
    );
}

export default Location;