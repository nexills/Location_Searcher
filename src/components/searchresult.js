import React from 'react';
import './searchresult.css';

function Searchcard(props) {
    const {data} = props;
    return (
        <div class="searchcard">
                <p class="card_text">{data["display_name"]}</p>
        </div>
    );
}

export default Searchcard;