// a component that pulls together all the data from the api

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// my components
import Header from './Header.js';
import City from './City.js';
import Loading from './Loading.js';
import Icon from './Icon.js';
import CurrentWeather from './CurrentWeather.js';

const Weather = () => {
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState("39466");
    const [state, setState] = useState("39466");
    const [isLoading, setIsLoading] = useState(true);

    const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
    const APILINK = `http://api.openweathermap.org/data/2.5/weather?zip=${state},us&appid=${APIKEY}`;
    // const APILINK = "http://api.openweathermap.org/data/2.5/weather?zip=39466,us&appid=898f442c701508af007773e6e6727c48";

    useEffect(() => {
        axios.get(APILINK)
            .then(res => {
                setApiData(res.data);
                setIsLoading(false);
            });
            // .catch(error => {
            //     console.log(error);
            // });
    }, [APILINK]);

    const inputHandler = event => {
        setGetState(event.target.value);
    }
    const submitHandler = () => {
        setIsLoading(true);
        setState(getState);
        setIsLoading(false);
        console.log(apiData.weather.description);
    }
    const handleKeyPress = event => {
        // have the text field respond to pressing the enter key
        if (event.key === 'Enter') {
            submitHandler();
        }
    }
    
    
    const kelvinToFarenheit = (k) => {  
        return (k * (9/5) - 459.67).toFixed(0);
    }
    
    return (
        <div>
            <Header />

            <div className="input-container">
                <label for="zip-code" className="zip-code-label">
                    Enter your zip code
                </label>
                <input
                    type="text"
                    id="zip-code"
                    className="zip-code-input"
                    onChange={inputHandler}
                    value={getState}
                    onKeyPress={handleKeyPress}
                />
                <button 
                onClick={submitHandler}
                className="submit-button"
                >
                    Go
                </button>
            </div>

            {isLoading ? 
                <Loading /> :
                <div>
                    <City cityName={apiData.name} />
                    <Icon iconCode={apiData.weather[0].icon}/>
                    <CurrentWeather 
                        temperature={kelvinToFarenheit(apiData.main.temp)} 
                        description={apiData.weather[0].description}
                        maxTemp={kelvinToFarenheit(apiData.main.temp_max)}
                        minTemp={kelvinToFarenheit(apiData.main.temp_min)}
                        feelsLike={kelvinToFarenheit(apiData.main.feels_like)}
                    />
                </div>
            }

        </div>
    );
}

export default Weather;