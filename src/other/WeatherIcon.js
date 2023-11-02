const WeatherIcon = ({ condition, description, sunOut, width, height, margin }) => {
    if(condition === 'Clear'){
        if(sunOut){
            return <div className="icon sunnyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
        }
        return <div className="icon clearNightIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === 'Clouds'){
        if(description === "few clouds" || description === "scattered clouds"){
            if(sunOut){
                return <div className="icon partlyCloudyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
            }
            return <div className="icon partlyCloudyNightIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
        }
        return <div className="icon cloudyIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === 'Thunderstorm'){
        return <div className="icon thunderstormIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === "Drizzle" || condition === "Rain"){
        return <div className="icon rainIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }else if(condition === "Snow"){
        return <div className="icon snowIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>
    }
    return <div className="icon windIcon" style={{width:`${width}%`, height: `${height}%`, marginLeft:`${margin}%`}}/>  
}

export default WeatherIcon;