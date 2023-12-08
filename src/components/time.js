import React from 'react';
import { useEffect, useState } from 'react';
import './time.css';

function Time(props) {
    const {offset} = props;
    const {timezone} = props;
    const {sunrise} = props;
    const {sunset} = props;
    const [time, timechange] = useState(0);

    useEffect(() => {
        var timer = setInterval(() => timechange(new Date()), 1000);
        return function clean() {
            clearInterval(timer);
        }
    })
    return (
    <div>
        <p className="centre"> {timezone} {offset >= 0 ? 
            "(GMT+" +parseInt(offset/3600)+")" :
            "(GMT" + parseInt(offset/3600)+")"}
            </p>
        <p>
            Local Time: {
            ((new Date(time).getUTCHours()+parseInt(offset/3600)+24)%24).toLocaleString(undefined, {minimumIntegerDigits: 2})+ 
            ":" + 
            ((new Date(time).getUTCMinutes()+parseInt(offset%3600/60)+60)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) +
            ":" +
            new Date(time).getUTCSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2})}
        </p>
        <p className='leftfloat'>{sunrise[0].slice(11,16)}<br/>Sunrise</p>
        <p className='rightfloat'>{sunset[0].slice(11,16)}<br/>Sunset</p>
    </div>
    );
}

export default Time;