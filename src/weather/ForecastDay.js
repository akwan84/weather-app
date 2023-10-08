const ForecastDay = ({ temp }) => {
    return(
        <div className="forecastDay">
            <h1>{`${temp}\u00B0C`}</h1>
        </div>
    );
}

export default ForecastDay;