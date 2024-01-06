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
    const [display, changedisplay] = useState("Weather");
    const info = location.split('&');

    const supported_currency = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP'
    , 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL'
    , 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD'
    , 'THB', 'ZAR']

    
    useEffect(() => {
        try {
            // get data from external apis
            fetch("https://api.open-meteo.com/v1/forecast?latitude=" + info[1] +
            "&longitude=" + info[2] + "&current=temperature_2m,relative_humidity_2m,weather_code,"+
            "apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,"+
            "sunrise,sunset,daylight_duration&timezone=auto&forecast_days=14")
            .then((response) => {
                return response.json();
            })
            .then((forecast) => {
                // build a graph
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
            // getting country information and currency information
            var country_name = info[0].split(",");
            country_name = country_name[country_name.length - 1];
            country_name = country_name.replaceAll("_", " ").trim();
            fetch("https://restcountries.com/v3.1/name/"+country_name)
            .then((response) => {
                return response.json();
            })
            .then((country_data) => {
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
                // get currency conversion rates, if supported
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
        }
    }, [])

    var show = (event) => {
        changedisplay(event.target.value);
    }
    


    return (
        <div>
            <Header/>
            <div id="select">
                <button onClick={show} value="Weather" className='selectbutton'>Weather</button>
                <button onClick={show} value="Currency" className='selectbutton'>Currency</button>
                <button onClick={show} value="Timezone" className='selectbutton'>Time</button>
                <button onClick={show} value="Info" className='selectbutton'>Info</button>
            </div>
            <div>
                {!weather? (<p>Loading...</p>): (
                    <div id="resultcontainer">
                        <h2>{info[0].replaceAll("_", " ")} {!country? (<label></label>): (
                            <label>{country[0]["flag"]}</label>)}</h2>
                        {/*Choosing what to display based on current page */}
                        {display === "Weather"? (
                        <div>
                            <Current condition={weather["current"]}/>                       
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
                        </div>
                        ):
                            (display === "Currency" ?
                            <Currency currency={currency}/>: (
                                display === "Timezone" ?
                                <Time offset={weather.utc_offset_seconds} 
                                    timezone={weather.timezone_abbreviation}
                                    sunrise={weather.daily.sunrise}
                                    sunset={weather.daily.sunset}/>: (
                                        country ? (<Country country={country[0]}/>) : (<div></div>)
                                    )
                                )
                            )
                        }
                        <div className="clearer"/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Result;