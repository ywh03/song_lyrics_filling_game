import React from "react";
import axios from "axios";
import LyricsSection from "./LyricsSection";

function LyricsArea() {

    const [lyricBoxStates, setLyricBoxStates] = React.useState([]);
    //const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:9000/lyrics');
                response.data.data.forEach((item, index) => {
                    item.index = index;
                    item.lyricBoxes = [];
                })
                //console.log(response);
                setLyricBoxStates(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    function updateLyricBoxState(matchingWords) {
        let tempLyricBoxStates = lyricBoxStates;
        matchingWords.forEach((word) => {
            tempLyricBoxStates[word.sectionId].lyricBoxes[word.boxId].state = word.state;
        })
        setLyricBoxStates(tempLyricBoxStates);
        console.log(lyricBoxStates);
    }

    function checkForWord(event) {
        const rawWord = event.target.value;
        console.log(rawWord);
        const processedWord = rawWord.replace("'", '').toLowerCase();
        let matchingWords = [];
        for (let i=0; i<lyricBoxStates.length; i++) {
            for (let j=0; j<lyricBoxStates[i].lyricBoxes.length; j++) {
                if (lyricBoxStates[i].lyricBoxes[j].text === processedWord) {
                    let tempObject = {
                        sectionId: i,
                        boxId: j,
                        state: 1,
                    }
                    matchingWords.push(tempObject);
                }
            }
        }
        console.log(matchingWords);
        if (matchingWords.length > 0) {
            updateLyricBoxState(matchingWords);
        }
    }

    return (
        <div>
            <div id="input-area">
                <input type="text" id="inputWord" onChange={checkForWord} />
            </div>
            <div id="lyrics-area">
                {
                    lyricBoxStates.map(function(item) {
                        return (
                            <LyricsSection key={item.index} sectionInfo={item} sectionIndex={item.index} lyricBoxStates={lyricBoxStates} setLyricBoxStates={setLyricBoxStates} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LyricsArea;