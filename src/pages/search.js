import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header.js';
import Searchcard from '../components/searchresult.js';

function Search() {
    const { location } = useParams();
    var locationstring = location.replaceAll("!", "%20");
    const [geo, geochange] = useState();

    useEffect(() => {
        try {

            fetch("https://us1.locationiq.com/v1/search?key=pk.5656ae4179330b525702ad97ed3ba00e\
            &format=json&q=" + locationstring)
            .then((response) => {
                return response.json();
            })
            .then((geolocation) => {
                // remove location that are close enough to basically be the same location
                for(let i = 0; i < geolocation.length; i++) {
                    for (let j = i+1; j < geolocation.length; j++) {
<<<<<<< HEAD
                        if (parseFloat(geolocation[i]["lat"]).toFixed(1) ===
                        parseFloat(geolocation[j]["lat"]).toFixed(1) &&
                        parseFloat(geolocation[i]["lon"]).toFixed(1) === 
=======
                        if (parseFloat(geolocation[i]["lat"]).toFixed(1) == 
                        parseFloat(geolocation[j]["lat"]).toFixed(1) &&
                        parseFloat(geolocation[i]["lon"]).toFixed(1) == 
>>>>>>> e262ed2f1a4d523193b9d1fb5b1302c727202f4d
                        parseFloat(geolocation[j]["lon"]).toFixed(1) ) {
                            // choose the one with a shorter name
                            if (geolocation[i]["display_name"].length < 
                            geolocation[j]["display_name"].length) {
                                geolocation.splice(j, 1);
                            } else {
                                geolocation.splice(i, 1);
                                j = i+1;
                            }
                        }
                    }
                }
                geochange(geolocation);
            });
        } catch (error) {
            console.log("Error: API call was not received");
            console.log(error);
        }}, []);

    return (
        <div>
            <Header/>
            <h2>Search Result</h2>
            <hr/>
            <div>
                {geo ? (
                    geo.map((x) => <Searchcard key={x.place_id} data={x} />)
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Search;