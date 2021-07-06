import React, { useState, useEffect } from 'react';
import axios from 'axios';

import City from './City.js'

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
        setState(getState);
    }
    
    const kelvinToFarenheit = (k) => {
        return (k * (9/5) - 459.67).toFixed(2);
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
            {/* <h1>{apiData.name}</h1> */}
            <City cityName={apiData.name} />
            <h2>
                {isLoading ? "Loading..." : kelvinToFarenheit(apiData.main.temp)}&deg;F
                {/* {kelvinToFarenheit(apiData.main.temp)}&deg;F */}
            </h2>
        </div>
    );
}

export default Weather;