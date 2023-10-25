import WeatherIcon from "../other/WeatherIcon";

const ForecastDay = ({ temp, date, condition, description, isMetric }) => {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const formattedDate = new Date(date * 1000);
    const dayOfWeek = DAYS[formattedDate.getDay()];
    return(
        <div className="forecastDay">
            <h3 className="weatherPageH3">{dayOfWeek}</h3>
            <h1 className="weatherPageH1">{`${temp}\u00B0${isMetric ? 'C' : 'F'}`}</h1>
            <WeatherIcon condition={condition} description={description} sunOut={true} width={50} height={50} margin={25}/>
        </div>
    );
}

export default ForecastDay;