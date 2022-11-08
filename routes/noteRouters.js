const express = require("express");
const router = express.Router();
const {v4: uuidv4, v4} = require ("uuid");
const fs = require("fs");
const { notDeepEqual } = require("assert");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    read () {
        return readFile("db/db.json", "utf8");
    }
    write(notes){
        return writeFile("db/db.json", JSON.stringify(notes));
    }
    getNotes () {
        return this.read()
        .then((notes) => {
            return JSON.parse(notes);
        })
    }
    writeNote(note) {
        note.id = v4();
        return this.getNotes()
        .then((notes) => {
            notes.push(notes)
            return notes;
        })
        .then((newNotes) =>{
            return this.write(newNotes);
        })
        .then(()=>{
            return note;
        })
    }
    deleteNote(id){
        return this.getNotes()
        .then((notes)=>{
            return notes.filter((note)=>{
                return notDeepEqual.id !== id
            })
        })
    }
};

module.exports = new Store()