import React from 'react';
import { Link } from 'react-router-dom';
import './searchresult.css';

function Searchcard(props) {
    const {data} = props;
    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }}
        to={"/result/"+ data["display_name"] + "&" +
        parseFloat(data["lat"]).toFixed(2)+"&"+parseFloat(data["lon"]).toFixed(2)}>
            <div className="searchcard">
                <p className="card_text">{data["display_name"]}</p>
                <p className="sm_card_text"> Latitude: {parseFloat(data["lat"]).toFixed(2)}</p>
                <p className="sm_card_text"> Longitude: {parseFloat(data["lon"]).toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default Searchcard;