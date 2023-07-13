import React from "react";
import LyricBox from "./LyricBox";

export default function LyricsSection(props) {

    return (
        <div>
            <h2 key={props.sectionIndex} className="lyrics-section-header">{props.sectionTitle}</h2>
            <div className="lyrics-section">
                {props.sectionBoxes?.map(function(boxInfo, index) {
                        return (
                            <div>
                                <LyricBox key={boxInfo.boxIndex} boxInfo={boxInfo} sectionIndex={props.sectionIndex} revealWord={props.revealWord} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}