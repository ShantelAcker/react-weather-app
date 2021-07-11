// a component for displaying the current weather

const CurrentWeather = props => {
    const temperature = props.temperature;
    const description = props.description;
    const maxTemp = props.maxTemp;
    const minTemp = props.minTemp;
    const feelsLike = props.feelsLike;

        return (
            <div>
                <p>{temperature}&deg;F</p>
                <p>{description}</p>
                <p>Hi: {maxTemp}&deg;F</p>
                <p>Low: {minTemp}&deg;F</p>
                <p>feels like: {feelsLike}&deg;F</p>
            </div>
        )
    
}

export default CurrentWeather;