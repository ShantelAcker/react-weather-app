// a component for choosing the weather icon that will be displayed

const Icon = props => {
    const iconCode = props.iconCode;
    const url = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="weather-icon">
            <img src={url} alt=""/>
        </div>
    )
}

export default Icon;