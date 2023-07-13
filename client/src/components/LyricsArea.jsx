import React from "react";
import axios from "axios";
import LyricsSection from "./LyricsSection";
import _ from "lodash";
import LyricInputArea from "./LyricInputArea";
import SongSearch from "./SongSearch";

function LyricsArea() {

    const [lyricStateData, setLyricStateData] = React.useState([]);
    const [currentInput, setCurrentInput] = React.useState("");

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
                setLyricStateData(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    
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
            response.data.forEach((box) => {
                tempObject[box.sectionIndex].boxesInfo[box.boxIndex].boxState = box.state;
            })
            setLyricStateData(tempObject);
        }
    }

    function testState(event) {
        let tempObject = [...lyricStateData];
        tempObject[0].boxesInfo[0].boxState = 1;
        console.log(event.target.value);
        setLyricStateData(tempObject);
    }
    

    return (
        <div>
            <LyricInputArea checkForWord={checkForWord} currentInput={currentInput} />
            <div id="lyrics-area">
                {
                    lyricStateData?.map(function(section, index) {
                        return (
                            //<div></div>
                            <LyricsSection key={section.sectionIndex} sectionTitle={section.sectionTitle} sectionIndex={section.sectionIndex} sectionBoxes={section.boxesInfo} allData={lyricStateData} />
                        )
                    })
                }
            </div>
            <SongSearch setLyricStateData={setLyricStateData} />
        </div>
    )
    
}

export default LyricsArea;