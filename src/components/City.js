// a component for displaying the name of a city

const City = props => {

    return (
        <div className="city-name">
            <h1>{props.cityName}</h1>
        </div>
    )
}

export default City;