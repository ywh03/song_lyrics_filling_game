import React from "react";

export default function LyricBox(props) {

    return (
        <div key={props.boxInfo.boxIndex} onClick={() => {
            props.revealWord(props.sectionIndex, props.boxInfo.boxIndex);
        }} className={`lyric-box ${ props.boxInfo.boxState === 1 ? 'lyric-box-filled' : props.boxInfo.boxState === 0 ? 'lyric-box-unfilled' : props.boxInfo.boxState === 2 ? "lyric-box-revealed" : "lyric-box-giveup"}`}>
            {props.boxInfo.boxText}
        </div>
    )
}