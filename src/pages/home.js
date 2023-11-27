import React from 'react';
import Header from '../components/header.js';
import search_icon from '../assets/search_icon.png';
import './home.css';

function Home() {
    return (
        <div style={{textAlign: "center", overflowX: "hidden"}}>
            <Header/>
            <div className='background'>
                <section className='infobox'>
                    <h2>Welcome!</h2>
                    <div>
                        <input type="text" placeholder='Search a place to get started:'></input>
                        <img src={search_icon} width="40px" height="40px"></img>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;