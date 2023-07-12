import React from "react";
import LyricBox from "./LyricBox";

export default function LyricsSection(props) {
    const [lyricsArray, setLyricsArray] = React.useState([]);
    const [updatedLength, setUpdatedLength] = React.useState(0);
    const [sectionBoxStates, setSectionBoxStates] = React.useState([]);

    React.useEffect(() => {
        let tempArray = props.sectionInfo.sectionBody.split(" ");
        tempArray = tempArray.filter(function(lyric) {
            return lyric !== "";
        });
        setLyricsArray(tempArray)
    }, [""])

    React.useEffect(() => {
        let tempArray = [];
        lyricsArray.forEach((item, index) => {
            let tempObject = {};
            tempObject = {
                index: index,
                text: item,
                state: 0, //0 means unfilled i.e. not revealed
            }
            tempArray.push(tempObject);
        })
        let tempStates = props.lyricBoxStates;
        tempStates[props.sectionIndex].lyricBoxes = tempArray;
        props.setLyricBoxStates(tempStates);
    }, [lyricsArray])

    React.useEffect(() => {
        console.log(props.lyricBoxStates);
        setSectionBoxStates(props.lyricBoxStates[props.sectionIndex].lyricBoxes)
    }, [props.lyricBoxStates[props.sectionIndex].lyricBoxes])

    React.useEffect(() => {
        setUpdatedLength(props.lyricBoxStates[props.sectionIndex].lyricBoxes.length);
    }, [props.lyricBoxStates[props.sectionIndex].lyricBoxes]);

    return (
        <div>
            <h2 key={props.sectionIndex} className="lyrics-section-header">{props.sectionInfo.sectionHeader}</h2>
            <div className="lyrics-section">
                { updatedLength > 0 ? (
                    lyricsArray.map(function(lyric, index) {
                        return (
                            <div>
                                <LyricBox lyricText={lyric} key={index} currentBoxState={sectionBoxStates[index].state} />
                            </div>
                        )
                    })
                    ) : <p>No posts</p>
                }
            </div>
        </div>
    )
}