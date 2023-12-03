import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header.js';
import './result.css';

function Result() {
    const { location } = useParams();
    const [weather, weatherchange] = useState();
    const [temp_data, data_change] = useState();
    const info = location.split('&');

    useEffect(() => {
        try {
            fetch("https://api.open-meteo.com/v1/forecast?latitude=" + info[1] +
            "&longitude=" + info[2] + "&current=temperature_2m,relative_humidity_2m,"+
            "apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,"+
            "sunrise,sunset,daylight_duration&timezone=auto")
            .then((response) => {
                return response.json();
            })
            .then((forecast) => {
                console.log(forecast);
                data_change({
                    labels: forecast["daily"]["time"].map((x)=>
                        x.slice(8, 10) + "/" + x.slice(5, 7)
                    ),
                    datasets: [
                        {
                            data: forecast["daily"]["temperature_2m_min"],
                            fill: false,
                            borderColor: 'rgba(0,0,255,1)',
                            borderWidth: 2,
                            tension: 0.6,
                            pointRadius: 0
                        },
                        {
                            data: forecast["daily"]["temperature_2m_max"],
                            fill: false,
                            borderColor: 'rgba(255,0,0,1)',
                            borderWidth: 2,
                            tension: 0.6,
                            pointRadius: 0
                        },
                    ],
                });
                weatherchange(forecast);
            });
        } catch (error) {
            console.log("Error: API call was not resolved");
            console.log(error);
        }}, []);

    return (
        <div>
            <Header/>
            <div>
                {!weather? (<p>Loading...</p>): (
                    <div>
                        <h2>{info[0]}</h2>
                        <p>Current Temperature: {weather["current"]["temperature_2m"]}°C</p>
                        <p>Feels like {weather["current"]["apparent_temperature"]}°C</p>
                        <p>Relative humidity: {weather["current"]["relative_humidity_2m"]}%</p>
                        <section className='graph'>
                            <Line data={temp_data} options={{
                                plugins: {
                                title: {
                                    display: true,
                                    text: 'Temperature Forecast',
                                },
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: 'Temperature'
                                }
                              },
                              x: {
                                title: {
                                  display: true,
                                  text: 'Date'
                                }
                              }
                            }
                            }}/></section>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Result;