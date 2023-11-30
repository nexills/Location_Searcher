import React from 'react';
import {useState} from 'react';
import Header from '../components/header.js';
import search_icon from '../assets/search_icon.png';
import './home.css';

function Home() {
    const [searchval, setSearch] = useState();
    function handleChange(event) {
        setSearch(event.target.value);
    }

    async function search() {
        try {
            var locationstring = searchval.trim();
            locationstring = locationstring.replace(" ", "%20");
            console.log(locationstring);

            fetch("https://us1.locationiq.com/v1/search?key=pk.5656ae4179330b525702ad97ed3ba00e\
            &format=json&q=" + locationstring)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((geolocation) => {
                // an array of json objects are returned
                // display all of them on result page
                console.log(geolocation);
                console.log(geolocation[0]["display_name"]);
            });
        } catch (error) {
            console.log("Error: API went wrong");
            console.log(error);
        }
    }

    return (
        <div style={{textAlign: "center", overflowX: "hidden"}}>
            <Header/>
            <div className='background'>
                <section className='infobox'>
                    <h2>Welcome!</h2>
                    <div>
                        <input id="input"
                        type="text" 
                        placeholder='Search a place to get started:'
                        onChange={handleChange}></input>
                        <button onClick={search}>
                            <img src={search_icon} width="40px" height="40px"></img>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;