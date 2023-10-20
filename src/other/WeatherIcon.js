const WeatherIcon = ({ condition, description, width, height, margin }) => {
    if(condition === 'Clear'){
        return <div className="sunnyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === 'Clouds'){
        if(description === "few clouds" || description === "scattered clouds"){
            return <div className="partlyCloudyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
        }
        return <div className="cloudyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === 'Thunderstorm'){
        return <div className="thunderstormIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === "Drizzle" || condition === "Rain"){
        return <div className="rainIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === "Snow"){
        return <div className="snowIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }
    return <div className="windIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>  
}

export default WeatherIcon;