const ConditionWidget = ({ icon, condition, value }) => {
    return (
        <div className="conditionWidget">
            <div className={icon}></div>
            <div className="conditionInfo">
                <h1 className="weatherPageH1">{condition}</h1>
                <h3 className="weatherPageH3">{value}</h3>
            </div>
        </div>
    );
}

export default ConditionWidget;