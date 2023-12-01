import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Result() {
    const { location } = useParams();
    var locationstring = location.replaceAll("!", "%20");

    useEffect(() => {
        try {
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
            console.log("Error: API call was not received");
            console.log(error);
        }}, []);

    return(
        <div>Result</div>
    );
}

export default Result;