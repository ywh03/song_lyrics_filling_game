import React from "react";

export default function LyricInputArea(props) {
    return (
        <div id="input-area">
            <h2>Enter your word here!</h2>
            <input className="lyric-input" type="text" id="inputWord" onChange={props.checkForWord} value={props.currentInput} disabled={props.hasStarted !== 1} />
            <button className="btn btn-danger" onClick={props.giveUp}>Give Up</button>
        </div>
    )
}