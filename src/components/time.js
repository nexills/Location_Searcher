import React from 'react';
import { useEffect, useState } from 'react';
import './time.css';

function Time(props) {
    const {offset} = props;
    const {timezone} = props;
    const {sunrise} = props;
    const {sunset} = props;
    const [time, timechange] = useState(0);
    const current_time = new Date();
    // refers to how much faster is at destination, in minutes
    const difference = current_time.getTimezoneOffset()+offset/60;

    const [local, localchange] = useState(0);
    const [client, clientchange] = useState(difference);
    useEffect(() => {
        var timer = setInterval(() => timechange(new Date()), 1000);
        return function clean() {
            clearInterval(timer);
        }
    })

    function localChange(event) {
        var newinput = event.target.value;
        localchange(newinput);
        if (newinput.length === 4) {
            var minute = (newinput%100+60+difference%60)%60;
            var hour = (parseInt(newinput/100)+48+parseInt(difference/60))%24;
            clientchange(String(hour*100+minute).padStart(4,'0'));
        }
    }
    function clientChange(event) {
        var newinput = event.target.value;
        clientchange(newinput);
        if (newinput.length === 4) {
            var minute = (newinput%100+60-difference%60)%60;
            var hour = (parseInt(newinput/100)+48-parseInt(difference/60))%24;
            localchange(String(hour*100+minute).padStart(4,'0'));
    }
    }

    return (
    <div>
        <p className="centre"> {timezone} {offset >= 0 ? 
            "(GMT+" +parseInt(offset/3600)+")" :
            "(GMT" + parseInt(offset/3600)+")"}
            {difference >= 0 ? (
                <p>{(difference/60).toFixed(1)} hours ahead your timezone</p>) : (
                    <p>{(-difference/60).toFixed(1)} hours behind your timezone</p>
                )
            }
            </p>
        <p className="centre"> Local Time: </p>
        <p className='digital_clock'>{
            ((new Date(time).getUTCHours()+parseInt(offset/3600)+24)%24).toLocaleString(undefined, {minimumIntegerDigits: 2})+ 
            ":" + 
            ((new Date(time).getUTCMinutes()+parseInt(offset%3600/60)+60)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) +
            ":" +
            new Date(time).getUTCSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2})}
        </p>
        <div className="center">
            <p>{sunrise[0].slice(11,16)}<br/>Sunrise</p>
            <p>{sunset[0].slice(11,16)}<br/>Sunset</p>
        </div>
        <div className="calculator">
            <h3> Timezone Converter</h3>
            <label className='leftfloat'>Your timezone</label>
            <label className='rightfloat'>This timezone</label>
            <br/> <br/>
            <input onChange={localChange} value={local} className='leftfloat' id="localtime"></input>
            <input onChange={clientChange} value={client} className='rightfloat' id="clienttime"></input>
        </div>
    </div>
    );
}

export default Time;