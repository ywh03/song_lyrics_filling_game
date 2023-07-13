import React from "react";

export default function LyricBox(props) {

    return (
        <div key={props.boxInfo.boxIndex} className={`lyric-box ${ props.boxInfo.boxState === 1 ? 'lyric-box-filled' : props.boxInfo.boxState === 0 ? 'lyric-box-unfilled' : null}`}>
            {props.boxInfo.boxText}
        </div>
    )
}