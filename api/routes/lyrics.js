var express = require('express');
var router = express.Router();
var lyrics = require('genius-lyrics-api');

function splitLyrics(rawLyrics) {
    var lyricSections = [];
    var tempSectionHeader = "";
    var tempSectionBody = "";
    var pointAtHeader = false;
    [...rawLyrics].forEach(function(char) {
        if(char === '['){
            if(tempSectionHeader) {
                var tempLyricObject = {
                    sectionHeader: tempSectionHeader,
                    sectionBody: tempSectionBody,
                }
                lyricSections.push(tempLyricObject);
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
    var tempLyricObject = {
        sectionHeader: tempSectionHeader,
        sectionBody: tempSectionBody,
    }
    lyricSections.push(tempLyricObject);
    return lyricSections;
}

router.get('/', async function(req, res, next){
    
    var allLyrics;
    var lyricSections;
    const options = {
        apiKey: "oeBPMjEoWIOh1j2b-3uumALkHe5TBSwP587u94-rEhafeXq1JWiGNtO6fxU_cBJJ",
        title: "Lover",
        artist: "Taylor Swift",
        optimizeQuery: true,
    };
    await lyrics.getLyrics(options).then((rawLyrics) => {
        //console.log("1." + rawLyrics);
        rawLyrics = rawLyrics.split("\n").join(" ").split("-").join(" ");
        rawLyrics = rawLyrics.replaceAll(',', '').replaceAll('"', '').replaceAll('\\', '').replaceAll('(', '').replaceAll(')', '').replaceAll("'", '');
        allLyrics = rawLyrics;
        lyricSections = splitLyrics(allLyrics);
    }).catch(err => {
        console.log(err);
    });

    return res.json({data: lyricSections});
})

module.exports = router;