import React from "react";

export default function LyricBox(props) {
    const [currentState, setCurrentState] = React.useState(props.currentBoxState);

    React.useEffect(() => {
        setCurrentState(props.currentBoxState);
    }, [props.currentBoxState]);

    return (
        <div className={`lyric-box ${ props.currentBoxState === 1 ? 'lyric-box-filled' : currentState === 0 ? 'lyric-box-unfilled' : null}`}>
            {props.lyricText}
        </div>
    )
}