import React from 'react';
import {Link} from 'react-router-dom';
import search_icon from '../assets/search_icon.png';
import {useState} from 'react';
import './header.css';

function Header() {
    const [searchval, setSearch] = useState(" ");
    function handleChange(event) {
        var temp = event.target.value.trim();
        temp = temp.replaceAll(" ", "!");
        setSearch(temp);
    }
    return (
        <div style={{textAlign: "center", overflowX: "hidden"}}>
            <div id="header">
                <Link to='/'>
                    <h1>Location Searcher</h1>
                </Link>
                <div id="smallsearch">
                    <input id="headerinput"
                    type="text" 
                    placeholder='Search...'
                    onChange={handleChange}></input>
                    <Link to={"/search/"+ searchval}>
                        <span id="headsearch">
                            <img src={search_icon} width="20px" height="20px"></img>
                        </span>
                    </Link>
                </div>
            </div>
            <div id="header_block"></div>
        </div>
    );
}

export default Header;