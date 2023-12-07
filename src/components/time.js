import React from 'react';
import { useEffect, useState } from 'react';

function Time(props) {
    const {offset} = props;
    const [time, timechange] = useState(0);

    useEffect(() => {
        var timer = setInterval(() => timechange(new Date()), 1000);
        return function clean() {
            clearInterval(timer);
        }
    })
    return (
    <p>
        Local Time: {
        ((new Date(time).getUTCHours()+parseInt(offset/3600)+24)%24).toLocaleString(undefined, {minimumIntegerDigits: 2})+ 
        ":" + 
        ((new Date(time).getUTCMinutes()+parseInt(offset%3600/60)+60)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) +
        ":" +
        new Date(time).getUTCSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2})}
    </p>
    );
}

export default Time;