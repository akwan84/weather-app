import countryCodes from '../CountryCodes.json';
import LocationSearchResult from './LocationSearchResult';

const LocationList = ({ data, addLocation }) => {
    const renderItems = () => {
        const results = [];
        for(let i = 0; i < data.length; i++){
            const country = countryCodes[data[i].country];
            results.push(
                <LocationSearchResult city={data[i].name} state={data[i].state} country={country} addLocation={addLocation}/>
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