const Location = ({ city, state, country }) => {
    return (
        <div>  
            {`${city}, ${state}, ${country}`}
        </div>
    );
}

export default Location;