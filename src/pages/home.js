import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.js';
import search_icon from '../assets/search_icon.png';
import './home.css';

function Home() {
    const [searchval, setSearch] = useState(" ");
    function handleChange(event) {
        var temp = event.target.value.trim();
        temp = temp.replaceAll(" ", "!");
        setSearch(temp);
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
                        <Link to={"/result/"+ searchval}>
                            <img src={search_icon} width="40px" height="40px"></img>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;