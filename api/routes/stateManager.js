const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get("/", function(req, res) {
    fs.readFile('lyricStates.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            const stateData = JSON.parse(data.toString());
            console.log("JSON data successfully read.");
            res.json(stateData);
        }
    })
});

router.post("/", function(req, res) {
    const {sectionNo, boxNo, newState} = req.body;
    let stateData;
    fs.readFile('lyricStates.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.json({"Error": err});
        } else {
            stateData = JSON.parse(data.toString());
            console.log(stateData);
            stateData[sectionNo].boxesInfo[boxNo].boxState = newState;
            console.log(stateData);
            const stringStateData = JSON.stringify(stateData, null, 4);
            fs.writeFile('lyricStates.json', stringStateData, error => {
                if (error) {
                    console.log(error);
                    res.json({"Error": error});
                } else {
                    res.json("JSON data is saved.");
                }
            })
        }
    })
});

module.exports = router;