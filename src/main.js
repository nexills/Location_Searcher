import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import Search from './pages/search.js';
import Result from './pages/result.js';

function Main() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/search/:location' element={<Search/>}></Route>
                <Route path='/result/:location' element={<Result/>}></Route>
            </Routes>
        </div>
    );
}

export default Main;