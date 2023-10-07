const Location = ({ city, state, country, temp, condition }) => {
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
                (condition === 'sunny') ? 
                    <div className="sunnyIcon"/>
                : (condition === 'cloudy') ? 
                    <div className="cloudyIcon"/>
                : 
                    <div className="partlyCloudyIcon"/>
            }
            
        </div>
    );
}

export default Location;