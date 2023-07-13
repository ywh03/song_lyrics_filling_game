var express = require('express');
var router = express.Router();
var lyrics = require('genius-lyrics-api');

function splitToWords(verse) {
    let tempArray = verse.split(" ");
    tempArray = tempArray.filter(function(lyric) {
        return lyric !== "";
    });
    return tempArray;
}

function splitSections(rawLyrics) {
    var sectionTitles = [];
    var boxTexts = [];
    var tempSectionHeader = "";
    var tempSectionBody = "";
    var pointAtHeader = false;
    [...rawLyrics].forEach(function(char) {
        if(char === '['){
            if(tempSectionHeader) {
                sectionTitles.push(tempSectionHeader);
                boxTexts.push(splitToWords(tempSectionBody));
                tempSectionHeader = "";
                tempSectionBody = "";
            }
            pointAtHeader = true;
        } else if(char === ']'){
            pointAtHeader = false;
        } else {
            if(pointAtHeader === true) {
                tempSectionHeader = tempSectionHeader.concat(char);
            } else {
                char = char.toLowerCase();
                tempSectionBody = tempSectionBody.concat(char);
            }
        }
    })
    // Push final object i.e. last verse
    sectionTitles.push(tempSectionHeader);
    boxTexts.push(splitToWords(tempSectionBody));
    const tempObject = {
        sectionTitles: sectionTitles,
        boxTexts: boxTexts,
    }
    return tempObject;
}

router.get('/', async function(req, res, next){

    const {songName, songArtist} = req.query;
    
    var formattedLyrics;
    const options = {
        apiKey: "oeBPMjEoWIOh1j2b-3uumALkHe5TBSwP587u94-rEhafeXq1JWiGNtO6fxU_cBJJ",
        title: songName,
        artist: songArtist,
        optimizeQuery: true,
    };
    await lyrics.getLyrics(options).then((rawLyrics) => {
        //console.log("1." + rawLyrics);
        rawLyrics = rawLyrics.split("\n").join(" ").split("-").join(" ");
        rawLyrics = rawLyrics.replaceAll(',', '').replaceAll('"', '').replaceAll('\\', '').replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll("?", '').replaceAll("!", '');
        formattedLyrics = splitSections(rawLyrics);
    }).catch(err => {
        console.log(err);
    });

    return res.json({data: formattedLyrics});
})

module.exports = router;