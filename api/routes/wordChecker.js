const express = require('express');
const router = express.Router();
const fs = require('fs');

function checkForWord(word, data) {
    console.log(data);
    let matchingWords = [];
    data.forEach((section) => {
        section.boxesInfo.forEach((box) => {
            if (box.boxText === word && box.boxState === 0) {
                matchingWords.push({
                    sectionIndex: section.sectionIndex,
                    boxIndex: box.boxIndex,
                    state: 1
                })
            }
        })
    })
    return matchingWords;
}

router.post("/", function(req, res) {
    const {word} = req.body;
    console.log(word);
    const processedWord = word.replace("'", '').toLowerCase();
    let stateData;
    // Read lyricStates.json file
    fs.readFile('lyricStates.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            stateData = JSON.parse(data.toString());
            console.log("JSON data successfully read.");
            const matchingWords = checkForWord(processedWord, stateData);
            if (matchingWords.length === 0) {
                res.json({});
            } else {
                res.json(matchingWords);
            }
        }
    })
})

module.exports = router;