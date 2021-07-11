// a component that pulls together all the data from the api

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// my components
import City from './City.js';
import Loading from './Loading.js';
import CurrentWeather from './CurrentWeather.js';

const Weather = () => {
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState("39466");
    const [state, setState] = useState("39466");
    const [isLoading, setIsLoading] = useState(true);

    const APIKEY = "898f442c701508af007773e6e6727c48";
    const APILINK = `http://api.openweathermap.org/data/2.5/weather?zip=${state},us&appid=${APIKEY}`;
    // const APILINK = "http://api.openweathermap.org/data/2.5/weather?zip=39466,us&appid=898f442c701508af007773e6e6727c48";

    useEffect(() => {
        axios.get(APILINK)
            .then(res => {
                setApiData(res.data);
                setIsLoading(false);
            });
    }, [APILINK]);

    const inputHandler = (event) => {
        setGetState(event.target.value);
    }
    const submitHandler = () => {
        setIsLoading(true);
        setState(getState);
        setIsLoading(false);
        console.log(apiData.weather.description);
    }
    
    
    const kelvinToFarenheit = (k) => {  
        return (k * (9/5) - 459.67).toFixed(0);
    }
    
    return (
        <div>
            <label for="zip-code">
                Enter your zip code
            </label>
            <input
                type="text"
                id="zip-code"
                onChange={inputHandler}
                value={getState}
            />
            <button onClick={submitHandler}>
                Go
            </button>
            <h2>
                {/* {isLoading ? "Loading..." : kelvinToFarenheit(apiData.main.temp)}&deg;F */}
                {/* {kelvinToFarenheit(apiData.main.temp)}&deg;F */}
            </h2>
            {isLoading ? 
                <Loading /> :
                <div>
                    <City cityName={apiData.name} />
                    <CurrentWeather 
                        temperature={kelvinToFarenheit(apiData.main.temp)} 
                        description={apiData.weather[0].description}
                        maxTemp={kelvinToFarenheit(apiData.main.temp_max)}
                        minTemp={kelvinToFarenheit(apiData.main.temp_min)}
                        feelsLike={kelvinToFarenheit(apiData.main.feels_like)}
                    />
                </div>
            }

            {/* next maybe try something like isLoading ? <loadingcompent /> : <current weather componnet /> */}
            {/* <CurrentWeather isLoading={isLoading} temperature={kelvinToFarenheit(apiData.main.temp)} /> */}
        </div>
    );
}

export default Weather;