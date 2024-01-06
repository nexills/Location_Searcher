import React from 'react';
import './current.css';

{/*
A list of weather code and conditions, from https://open-meteo.com/en/docs#current=
Code 	    Description
0 	        Clear sky
1, 2, 3 	Mainly clear, partly cloudy, and overcast
45, 48 	    Fog and depositing rime fog
51, 53, 55 	Drizzle: Light, moderate, and dense intensity
56, 57 	    Freezing Drizzle: Light and dense intensity
61, 63, 65 	Rain: Slight, moderate and heavy intensity
66, 67 	    Freezing Rain: Light and heavy intensity
71, 73, 75 	Snow fall: Slight, moderate, and heavy intensity
77 	        Snow grains
80, 81, 82 	Rain showers: Slight, moderate, and violent
85, 86 	    Snow showers slight and heavy
95 * 	    Thunderstorm: Slight or moderate
96, 99 * 	Thunderstorm with slight and heavy hail
 */}

function Current(props) {
    const {condition} = props;
    var code = parseInt(condition["weather_code"]);
    var weather_type = "";
    // a converter from weather code to weather conditions
    switch (code) {
        case 0:
            weather_type = "Clear ☼";
            break;
        case 1:
            weather_type = "Mostly Clear 🌤";
            break;
        case 2:
            weather_type = "Partly Cloudy 🌤";
            break;
        case 3:
            weather_type = "Overcast ☁";
            break;
        case 45:
        case 48:
            weather_type = "Fog 🌫";
            break;
        case 51:
        case 61:
            weather_type = "Light Rain 🌧";
            break;
        case 53:
        case 63:
            weather_type = "Rain 🌧";
            break;
        case 55:
        case 65:
            weather_type = "Heavy Rain 🌧";
            break;
        case 56:
        case 66:
            weather_type = "Light Freezing Rain 🌨";
            break;
        case 57:
        case 67:
            weather_type = "Heavy Freezing Rain 🌨";
            break;
        case 71:
        case 77:
            weather_type = "Light Snow ❄";
            break;
        case 73:
            weather_type = "Snow ❄";
            break;
        case 75:
            weather_type = "Heavy Snow ❄";
            break;
        case 80:
        case 81:
            weather_type = "Rain Showers 🌧";
            break;
        case 82:
            weather_type = "Heavy Rain Showers 🌧";
            break;
        case 85:
            weather_type = "Light Snow Showers 🌧";
            break;
        case 86:
            weather_type = "Snow Showers 🌧";
            break;
        case 95:
        case 96:
        case 99:
            weather_type = "Thunderstorm ⛈";
            break;

    }

    return (
        <div>
            <p className='maintext'>Current Temperature: {condition["temperature_2m"]}°C</p>
            <p className='subtext'>Feels like {condition["apparent_temperature"]}°C<br/>
                Relative humidity: {condition["relative_humidity_2m"]}%</p>
            <p className='maintext'> {weather_type}</p>
        </div>
    );
}

export default Current;