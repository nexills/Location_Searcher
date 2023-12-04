import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <div>
            <div id="header">
                <Link to='/'>
                    <h1>Location Searcher</h1>
                </Link>
            </div>
            <div id="header_block"></div>
        </div>
    );
}

export default Header;