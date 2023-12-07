import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header.js';
import Time from '../components/time.js';
import Current from '../components/current.js';
import Currency from '../components/currency.js';
import Country from '../components/country.js';
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
            "&longitude=" + info[2] + "&current=temperature_2m,relative_humidity_2m,weather_code,"+
            "apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,"+
            "sunrise,sunset,daylight_duration&timezone=auto&forecast_days=14")
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
                console.log(forecast);
                weatherchange(forecast);
            });
        } catch (error) {
            console.log("Error: API call was not resolved");
            console.log(error);
        }}, []);
        
    useEffect(() => {
        try {
            var country_name = info[0].split(",");
            country_name = country_name[country_name.length - 1];
            country_name = country_name.replaceAll("_", " ").trim();
            console.log(country_name);
            fetch("https://restcountries.com/v3.1/name/"+country_name)
            .then((response) => {
                return response.json();
            })
            .then((country_data) => {
                console.log(country_data);
                // if multiple responses, choose the best one
                var index = 0;
                if (country_data.length > 1) {
                    for (var i = 0; i < country_data.length; i++) {
                        if (country_name === country_data[i].name.common) {
                            index = i;
                            break;
                        }
                    }
                }
                countrychange(country_data.slice(index,index+1));
                // get the name of the currency
                var keys = Object.keys(country_data[index]["currencies"]);
                console.log(keys[0]);  

                if (supported_currency.includes(keys[0])) {
                    fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Bs4cRDRARUX3w1aGLxlc"+
                    "QQK4HndHWIUjzFmI4rzv&currencies="+keys[0]+"&base_currency=CAD")
                    .then((response)=> {
                        return response.json();
                    })
                    .then((currency) => {
                        currencychange([currency["data"][keys[0]], keys[0]]);
                    })
                } else {
                    currencychange([{}, keys[0]]);
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
                        <h2>{info[0].replaceAll("_", " ")} {!country? (<label></label>): (
                            <label>{country[0]["flag"]}</label>)}</h2>
                        <section className='leftfloat'>
                            <Current condition={weather["current"]}/>
                            <Currency currency={currency}/>
                        </section>
                        <section className='rightfloat'>
                            <p className="centre"> {weather.timezone_abbreviation + " (GMT"}
                            {weather.utc_offset_seconds >= 0 ? 
                            "+"+parseInt(weather.utc_offset_seconds/3600)+")":
                            parseInt(weather.utc_offset_seconds/3600)+")"}
                            </p>
                            <Time offset={weather.utc_offset_seconds}/>
                            <p className='leftfloat'>{weather.daily.sunrise[0].slice(11,16)}<br/>Sunrise</p>
                            <p className='rightfloat'>{weather.daily.sunset[0].slice(11,16)}<br/>Sunset</p>
                        </section>
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
                                },
                                grid: {
                                    display: false
                                }
                              },
                              x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                },
                                grid: {
                                    display: false
                                }
                              }
                            }
                            }}/></section>
                        <section id="rule">
                            {country ? (<Country country={country[0]}/>) : (<div></div>)}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Result;