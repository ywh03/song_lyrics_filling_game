import React from "react";
import axios from "axios";
import LyricsSection from "./LyricsSection";
import _ from "lodash";
import LyricInputArea from "./LyricInputArea";
import SongSearch from "./SongSearch";
import CompletionDisplay from "./CompletionDisplay";
import Timer from "./Timer";

function LyricsArea() {

    const [totalBoxes, setTotalBoxes] = React.useState();
    const [lyricStateData, setLyricStateData] = React.useState([]);
    const [currentInput, setCurrentInput] = React.useState("");
    const [hasStarted, setStarted] = React.useState(0); //0 not started, 1 started, 2 paused
    const [timeEnd, setTimeEnd] = React.useState(Date.now() + 300000)
    const [isLoading, setLoading] = React.useState(false);

    /*
    React.useEffect(() => {
        async function fetchData() {
            try {
                const rawLyrics = await axios.get('http://localhost:9000/lyrics', {
                    params: {
                        songName: "Lover",
                        songArtist: "Taylor Swift"
                    }
                });
                console.log(rawLyrics.data.data);
                const response = await axios.post('http://localhost:9000/init', rawLyrics.data);
                console.log(response);
                setLyricStateData(response.data.data)
                let tempCount = 0;
                response.data.data.forEach((section) => {
                    tempCount += section.boxesInfo.length;
                })
                setTotalBoxes(tempCount);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    */

    async function checkForWord(event) {
        setCurrentInput(event.target.value);
        const response = await axios.post('http://localhost:9000/word', {"word": event.target.value});
        if (_.isEmpty(response.data)) {
            console.log("Word not found");
        } else {
            console.log(response.data);
            axios.post('http://localhost:9000/state', response.data);
            setCurrentInput("");
            let tempObject = [...lyricStateData];
            if (response.data.length > 0) {
                response.data.forEach((box) => {
                    tempObject[box.sectionIndex].boxesInfo[box.boxIndex].boxState = box.state;
                })
            }
            setLyricStateData(tempObject);
        }
    }

    function revealWord(sectionIndex, boxIndex) {
        if (hasStarted === 1) {
            let tempObject = [...lyricStateData];
            tempObject[sectionIndex].boxesInfo[boxIndex].boxState = 2;
            setLyricStateData(tempObject);
            const update = [{
                sectionIndex: sectionIndex,
                boxIndex: boxIndex,
                state: 2
            }]
            axios.post('http://localhost:9000/state', update);
        }
    }

    /*
    function testState(event) {
        let tempObject = [...lyricStateData];
        tempObject[0].boxesInfo[0].boxState = 1;
        console.log(event.target.value);
        setLyricStateData(tempObject);
    }
    */

    function giveUp() {
        let tempObject = [...lyricStateData];
        tempObject.forEach((section) => {
            section.boxesInfo.forEach((box) => {
                if(box.boxState === 0){
                    box.boxState = 3;
                }
            })
        })
        setStarted(false);
        setLyricStateData(tempObject);
        setTimeEnd(Date.now())
    }
    
    return (
        <div>
            <div id="header" className="sticky-top">
                <LyricInputArea className="header-item" checkForWord={checkForWord} currentInput={currentInput} giveUp={giveUp} hasStarted={hasStarted} />
                <Timer hasStarted={hasStarted} setStarted={setStarted} giveUp={giveUp} timeEnd={timeEnd} setTimeEnd={setTimeEnd} />
                <CompletionDisplay className="header-item" lyricStateData={lyricStateData} totalBoxes={totalBoxes} />
            </div>
            {isLoading ?  
                <div className="loading">
                    <h1>Loading...</h1>
                </div> : (
            <div id="lyrics-area">
                {
                    lyricStateData?.map(function(section, index) {
                        return (
                            //<div></div>
                            <LyricsSection key={section.sectionIndex} sectionTitle={section.sectionTitle} sectionIndex={section.sectionIndex} sectionBoxes={section.boxesInfo} allData={lyricStateData} revealWord={revealWord} />
                        )
                    })
                }
            </div>
                )}
            <SongSearch setLyricStateData={setLyricStateData} setTotalBoxes={setTotalBoxes} setLoading={setLoading} />
        </div>
    )
    
}

export default LyricsArea;