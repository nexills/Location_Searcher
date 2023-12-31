import React from 'react';
import { useEffect, useState } from 'react';
import './country.css';

function Country(props) {
    const {country} = props;

    var [isOpen, change] = useState(false);
    var [buttontext, changetext] = useState("Show more");
    function handleClick() {
        change(!isOpen);
        if (isOpen) changetext("Show more");
        else changetext("Show less");
    }

    return (
    <div>
        {country?( 
            <div>
                <img id="flag" src={country.flags.png}/>
                <p>This location is located in {country.name.official}, {country.continents}</p>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km² </p>
                <p>Population: {country.population}</p>
                <p> Official Languages:
                    {Object.values(country.languages).length === 1 ?
                    (" " + Object.values(country.languages)[0]) :
                    (" " + Object.values(country.languages).slice(0,-1).map((x) => x+", ")+
                    Object.values(country.languages)[Object.values(country.languages).length - 1])}
                </p>
                <div id="dropdowninfo">
                    <button id="dropdown" onClick={handleClick}>{buttontext}</button>
                    {isOpen ? (
                        <div>
                            {country.unMember ? <p>This country is a UN Member</p> :
                            <p>This country is not a UN Member</p>}
                            <p>Country/Area code: {country.idd.root+country.idd.suffixes[0]}</p>
                            <p>Gini coefficient: {country.gini ? (Object.values(country.gini)/100).toFixed(2)
                            : (<label> Unknown</label>)}</p>
                            <p>Drives on the {country.car.side} side of the road</p>
                        </div>
                    )
                : (<div></div>)}
                </div>
            </div>
        ):(<div>No country info</div>)}
    </div>
    );
}

export default Country;