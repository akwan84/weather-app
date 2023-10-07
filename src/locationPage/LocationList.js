import countryCodes from '../CountryCodes.json';

const LocationList = ({ data }) => {
    const renderItems = () => {
        const results = [];
        for(let i = 0; i < data.length; i++){
            results.push(
                <div className="location">{`${data[i].name},${data[i].state}, ${data[i].country}`}</div>
            )
        }
        return results;
    }

    return (
        <div>
            {renderItems()}
        </div>
    )
}

export default LocationList;