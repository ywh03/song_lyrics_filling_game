import React from "react";
import Countdown from "react-countdown";

export default function Timer(props) {
    const countdownApiRef = React.useRef();

    React.useEffect(() => {
        countdownApiRef.current.pause();
    }, [])

    function renderer({hours, minutes, seconds, completed}) {
        let formatted_seconds = seconds;
        if (formatted_seconds < 10) {
            formatted_seconds = `0${formatted_seconds}`;
        }
        if (completed) {
            return <h3>Time's Up!</h3>
        } else {
            return <h3>Time Remaining: {minutes}:{formatted_seconds}</h3>;
        }
    }

    function resetTimer() {
        countdownApiRef.current.pause();
        props.setStarted(0);
        props.setTimeEnd(Date.now() + 300000);
    }

    function toggleTimer() {
        if (props.hasStarted === 0) {
            countdownApiRef.current.start();
            props.setStarted(1);
        } else if (props.hasStarted === 1) {
            countdownApiRef.current.pause();
            props.setStarted(2);
        } else {
            countdownApiRef.current.start();
            props.setStarted(1);
        }
    }

    return (
        <div>
            <Countdown key={0} ref={countdownApiRef} date={props.timeEnd} renderer={renderer} onComplete={() => {props.giveUp()}} />
            <button className={`btn ${props.hasStarted === 1 ? 'btn-warning' : 'btn-success'}`} onClick={toggleTimer}>{props.hasStarted === 0 ? "Start" : props.hasStarted === 1 ? "Pause" : 'Resume'}</button>
            <button className="btn btn-danger" onClick={resetTimer}>Reset</button>
        </div>
    )
}