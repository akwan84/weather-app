import forecastApi from "../forecastApi/forecastApi";
import ForecastDay from "./ForecastDay";
import { useEffect, useState } from "react";

const Forecast = ({ lat, long, isMetric }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [forecastData, setForecastData] = useState([]);

    const toFahrenheit = (temp) => {
        return parseInt((temp * (9 / 5)) + 32);
    }

    useEffect(() => {
        const getData = async() => {
            try{
                const results = [];
                const response = await forecastApi.get(`/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
                const responseData = response.data;
                console.log(responseData.length);
                for(let i = 0; i < 40; i+=8){
                    results.push(
                        {
                            "temp": parseInt(responseData["list"][i]["main"]["temp"] - 273.15),
                            "tempFar": toFahrenheit(responseData["list"][i]["main"]["temp"] - 273.15),
                            "date": responseData["list"][i]["dt"],
                            "condition": responseData["list"][i]["weather"][0]["main"],
                            "description": responseData["list"][i]["weather"][0]["description"]
                        }
                    );
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
                <ForecastDay temp={isMetric ? forecast["temp"] : forecast["tempFar"]} date={forecast["date"]} condition={forecast["condition"]} description={forecast["description"]} isMetric={isMetric}/>
            ))}
        </div>
    );
}

export default Forecast;