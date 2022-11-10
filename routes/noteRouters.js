const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require ("uuid");
const fs = require("fs");
const util = require("../helpers/fsUtils");

//get route for all notes
router.get("/", (req, res) => {
    util
        .readFromFile("./db/db.json")
        .then((data) => res.json(JSON.parse(data)));
});

//get route for one note
router.get("/:id", (req, res)=> {
    const noteID = req.params.id;

    const notes = JSON.parse(fs.readFileSync("./db/dbjson"));

    for (const note of notes){
        if(noteID === note.id){
            return res.json(note);
        }
    }

    return res.json("Not Found");
});

//POST route for new
router.post("/", (req, res) => {

    if(req.body){
        const {title, text} = req.body;

        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        util.readAndAppend(newNote,"./db/db.json");
        res.json('Note Added!');
    }else{
        res.errored('Error adding note');
    }
});

router.delete("/:id", (req, res)=>{

    const idToDelete = req.params.id;

    const notes = JSON.parse(fs.readFileSync('./db/db.json'));

    const trashNote = [];

    for(const note of notes){
        if (idToDelete !== note.id){
            trashNote.push(note);
        }
    }
    util.writeToFile("./db/db.json", trashNote);

    return res.json(`${idToDelete} has been deleted`);
});

module.exports = router;