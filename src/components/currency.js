import React from 'react';

function Currency(props) {
    const {currency} = props;
    const supported_currency = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP'
    , 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL'
    , 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD'
    , 'THB', 'ZAR']

    return (
    <div>
        {currency?( 
            (!supported_currency.includes(currency[1]) || currency[1] === "CAD") ? (
                <p>Local currency: {currency[1]}</p>
        ): (
            <div>
                <p>Local currency: {currency[1]}</p>
                <p>Exchange rate: 1 CAD = {currency[0].toFixed(3)} {currency[1]}</p>
            </div>
            )
        ):(<div></div>)}
    </div>
    );
}

export default Currency;