import React from 'react';
import { useEffect, useState } from 'react';

function Currency(props) {
    const {currency} = props;
    const supported_currency = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP'
    , 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL'
    , 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD'
    , 'THB', 'ZAR']

    const [local, localchange] = useState(0);
    const [client, clientchange] = useState(0);
    
    function localChange(event) {
        var newinput = event.target.value;
        if (newinput > 0) {
            localchange(newinput);
            clientchange(newinput*currency[0].toFixed(3));
        }
    }

    function clientChange(event) {
        var newinput = event.target.value;
        if (newinput > 0) {
            clientchange(newinput);
            localchange(newinput/currency[0].toFixed(3));
        }
    }
    return (
    <div>
        {currency?( 
            (!supported_currency.includes(currency[1]) || currency[1] === "CAD") ? (
                <p>Local currency: {currency[1]}</p>
        ): (
            <div>
                <p>Local currency: {currency[1]}</p>
                <p>Exchange rate: 1 CAD = {currency[0].toFixed(3)} {currency[1]}</p>
                <div className="calculator">
                    <h3>Currency Converter</h3>
                    <label className='leftfloat'>CAD</label>
                    <label className='rightfloat'>{currency[1]}</label>
                    <br/> <br/>
                    <input onChange={localChange} value={local} className='leftinput'></input>
                    <input onChange={clientChange} value={client} className='rightinput'></input>
                </div>
            </div>
            )
        ):(<div></div>)}
    </div>
    );
}

export default Currency;