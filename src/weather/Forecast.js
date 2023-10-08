import forecastApi from "../forecastApi/forecastApi";
import ForecastDay from "./ForecastDay";
import { useEffect, useState } from "react";

const Forecast = ({ lat, long }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const getData = async() => {
            try{
                const results = [];
                const response = await forecastApi.get(`/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
                const responseData = response.data;
                for(let i = 0; i < 5; i++){
                    //results.push(<div className="forecastDay">{responseData["list"][i]["main"]["temp"]}</div>)
                    results.push(parseInt(responseData["list"][i]["main"]["temp"] - 273.15));
                }
                setForecastData(results);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, [lat, long, apiKey]);
    
    return (
        <div>
            {forecastData.map(forecast => (
                <ForecastDay temp={forecast} />
            ))}
        </div>
    );
}

export default Forecast;