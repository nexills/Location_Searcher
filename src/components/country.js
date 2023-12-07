import React from 'react';
import { useEffect, useState } from 'react';

function Country(props) {
    const {country} = props;

    return (
    <div>
        {country?( 
            <div>
                <p>This location is located in {country.name.official}, {country.continents}</p>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km² </p>
                <p>Population: {country.population}</p>
                <p> Official Languages:
                    {Object.values(country.languages).length == 1 ?
                    (" " + Object.values(country.languages)[0]) :
                    (" " + Object.values(country.languages).slice(0,-1).map((x) => x+", ")+
                    Object.values(country.languages)[Object.values(country.languages).length - 1])}
                </p>
            </div>
        ):(<div>No country info</div>)}
    </div>
    );
}

export default Country;