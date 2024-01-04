import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main.js';
import './index.css';
import { HashRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter base="/">
      <Main/>
    </HashRouter>
  </React.StrictMode>
);

