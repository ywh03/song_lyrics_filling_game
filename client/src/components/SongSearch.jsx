import React from "react";

export default function SongSearch(props) {

    function updateSongName(event) {
        const newSongName = event.target.value;
        props.setSongName(newSongName);
    }

    function updateSongArtist(event) {
        const newSongArtist = event.target.value;
        props.setSongArtist(newSongArtist);
    }

    return (
        <div id="song-search">
            <h2>Search for a Song here!</h2>
            <input type="text" id="songName" placeholder="Song Name" onChange={updateSongName} value={props.songName} />
            <input type="text" id="songArtist" placeholder="Artist Name" onChange={updateSongArtist} value={props.songArtist} />
            <button className="btn btn-primary" onClick={props.searchAndEmplace} >Search</button>
        </div>
    );
}