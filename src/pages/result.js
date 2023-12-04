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
    const [currency, currencychange] = useState();
    const [country, countrychange] = useState();
    const info = location.split('&');

    const supported_currency = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP'
    , 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL'
    , 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD'
    , 'THB', 'ZAR']

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
    
    useEffect(() => {
        try {
            var country_name = info[0].split("_");
            country_name = country_name[country_name.length - 1];
            console.log(country_name);
            fetch("https://restcountries.com/v3.1/name/"+country_name)
            .then((response) => {
                return response.json();
            })
            .then((country_data) => {
                console.log(country_data);
                countrychange(country_data);
                // get the name of the currency
                var keys = Object.keys(country_data[0]["currencies"]);
                console.log(keys[0]);  

                if (supported_currency.includes(keys[0])) {
                    fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Bs4cRDRARUX3w1aGLxlc"+
                    "QQK4HndHWIUjzFmI4rzv&currencies="+keys[0]+"&base_currency=CAD")
                    .then((response)=> {
                        return response.json();
                    })
                    .then((currency) => {
                        currencychange([currency["data"][keys[0]], keys[0]]);
                        console.log(currency["data"][keys[0]]);
                    })
                }
            })

            
        } catch (error) {
            console.log("Error: API call was not resolved");
            console.log(error);
        }
    }, [])

    return (
        <div>
            <Header/>
            <div>
                {!weather? (<p>Loading...</p>): (
                    <div id="resultcontainer">
                        <h2>{info[0].replaceAll("_", " ")}</h2>
                        <p>Current Temperature: {weather["current"]["temperature_2m"]}°C</p>
                        <p>Feels like {weather["current"]["apparent_temperature"]}°C</p>
                        <p>Relative humidity: {weather["current"]["relative_humidity_2m"]}%</p>
                        {!country? (<p>Loading...</p>): (
                            <p>{country[0]["flag"]}</p>
                        )}
                        {currency?(
                            <p>Exchange rate: 1 CAD = {currency[0]} {currency[1]}</p>
                        ):(<div></div>)}
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