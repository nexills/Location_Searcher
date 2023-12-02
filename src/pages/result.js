import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header.js';
import Searchcard from '../components/searchresult.js';

function Result() {
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
                for(let i = 0; i < geolocation.length; i++) {
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

export default Result;