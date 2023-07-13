import React from "react";
import axios from "axios";

export default function SongSearch(props) {

    const [songName, setSongName] = React.useState("");
    const [songArtist, setSongArtist] = React.useState("");

    function updateSongName(event) {
        const newSongName = event.target.value;
        setSongName(newSongName);
    }

    function updateSongArtist(event) {
        const newSongArtist = event.target.value;
        setSongArtist(newSongArtist);
    }

    async function searchAndEmplace() {
        try {
            const rawLyrics = await axios.get('http://localhost:9000/lyrics', {
                params: {
                    songName: songName,
                    songArtist: songArtist
                }
            });
            console.log(rawLyrics.data.data);
            const response = await axios.post('http://localhost:9000/init', rawLyrics.data);
            console.log(response);
            props.setLyricStateData(response.data.data);
            let tempCount = 0;
            response.data.data.forEach((section) => {
                tempCount += section.boxesInfo.length;
            })
            props.setTotalBoxes(tempCount);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h2>Search for a Song here!</h2>
            <input type="text" id="songName" placeholder="Song Name" onChange={updateSongName} value={songName} />
            <input type="text" id="songArtist" placeholder="Artist Name" onChange={updateSongArtist} value={songArtist} />
            <button onClick={searchAndEmplace} >Search</button>
        </div>
    );
}