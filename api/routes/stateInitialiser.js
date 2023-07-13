const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post("/", function(req, res) {
    const rawData = req.body.data;
    const {sectionTitles, boxTexts} = rawData;
    let lyricInfo = [];
    for (let i = 0; i < sectionTitles.length; i++) {
        let tempSectionInfo = {};
        tempSectionInfo.sectionIndex = i;
        tempSectionInfo.sectionTitle = sectionTitles[i];
        let tempBoxesArray = [];
        for (let j=0; j < boxTexts[i].length; j++) {
            let tempBoxInfo = {};
            tempBoxInfo.boxIndex = j;
            tempBoxInfo.boxText = boxTexts[i][j];
            tempBoxInfo.boxState = 0;
            tempBoxesArray.push(tempBoxInfo);
        }
        tempSectionInfo.boxesInfo = tempBoxesArray;
        lyricInfo.push(tempSectionInfo);
    }
    const lyricData = JSON.stringify(lyricInfo, null, 4);
    fs.writeFile('lyricStates.json', lyricData, err => {
        if (err) {
            console.log(err);
            res.json({"Error": err});
        } else {
            console.log("JSON data is saved.");
            res.json({"Success": "JSON data is saved.", "data": lyricInfo});
        }
    })
});

module.exports = router;