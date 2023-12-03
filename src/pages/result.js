import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header.js';

function Result() {
    const { location } = useParams();
    const [weather, weatherchange] = useState();
    const info = location.split('&');

    useEffect(() => {
        try {
            fetch("https://api.open-meteo.com/v1/forecast?latitude=" + info[1] +
            "&longitude=" + info[2] + "&hourly=temperature_2m")
            .then((response) => {
                return response.json();
            })
            .then((forecast) => {
                console.log(forecast);
                weatherchange(forecast);
            });
        } catch (error) {
            console.log("Error: API call was not received");
            console.log(error);
        }}, []);

    return (
        <div>
            <Header/>
        </div>
    );
}

export default Result;