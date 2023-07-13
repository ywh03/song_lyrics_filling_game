import React from "react";

export default function CompletionDisplay(props) {
    const [filledBoxes, setFilledBoxes] = React.useState(0);
    const [revealedBoxes, setRevealedBoxes] = React.useState(0);

    React.useEffect(() => {
        function countFilledBoxes() {
            let tempCount = 0;
            props.lyricStateData.forEach((section) => {
                section.boxesInfo.forEach((box) => {
                    if (box.boxState === 1) {
                        tempCount++;
                    }
                })
            })
            return tempCount;
        }
        function countRevealedBoxes() {
            let tempCount = 0;
            props.lyricStateData.forEach((section) => {
                section.boxesInfo.forEach((box) => {
                    if (box.boxState === 2) {
                        tempCount++;
                    }
                })
            })
            return tempCount;
        }
        setFilledBoxes(countFilledBoxes);
        setRevealedBoxes(countRevealedBoxes);
    }, [props.lyricStateData]);


    return (
        <div className="completion-display">
            <p>Total: {props.totalBoxes}</p>
            <p>Filled: {filledBoxes} ({Math.round(filledBoxes / props.totalBoxes * 1000) / 10}%)</p>
            <p>Revealed: {revealedBoxes} ({Math.round(revealedBoxes / props.totalBoxes * 1000) / 10}%)</p>
        </div>
    );
}