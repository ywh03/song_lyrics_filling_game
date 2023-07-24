import React from "react";
import Countdown from "react-countdown";

export default function Timer(props) {
    const countdownApiRef = React.useRef(null);

    React.useEffect(() => {
        countdownApiRef.current.pause();
    }, [])

    function renderer({hours, minutes, seconds, completed}) {
        let formatted_seconds = seconds;
        if (formatted_seconds < 10) {
            formatted_seconds = `0${formatted_seconds}`;
        }
        if (completed) {
            props.giveUp();
            return <h3>Time's Up!</h3>
        } else {
            return <h3>Time Remaining: {minutes}:{formatted_seconds}</h3>;
        }
    }

    function resetTimer() {
        countdownApiRef.current.pause();
        props.setTimeEnd(Date.now() + 300000);
    }

    function startTimer() {
        countdownApiRef.current.start();
        props.setStarted(true);
    }

    function pauseTimer() {
        countdownApiRef.current.pause();
        props.setStarted(false);
    }

    return (
        <div>
            <Countdown key={0} ref={countdownApiRef} date={props.timeEnd} renderer={renderer} />
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}