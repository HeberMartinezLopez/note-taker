const notes = require('express').Router();
const dbNotes = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (__req,res) => res.status(200).json(dbNotes));

notes.post('/', (req,res) => {
    const { title, text } = req.body;

    if(!title || !text){
        return res.status(500).json({msg: 'Please fill all fields to save note.'});
    }
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };
    const response = {
        status: 'success',
        body: newNote,
    };
    
    dbNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), (err) => err ? console.error(err) : console.log ('Saved new note'));
    
    res.json(response);

});

notes.delete('/:id', (req,res) => {
    const id = req.params.id;

    const deleteNote = dbNotes.findIndex((note) => note.id === id);
    if(deleteNote === -1) {
        return res.status(500).json({msg: 'Computer does not like it.'});
    }
    
    dbNotes.splice(deleteNote, 1);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), (err) => err ? console.error(err) : console.log('Note deleted'));
    
    res.status(200).json({ msg: 'deleted 👍🏽'});  
});

module.exports = notes;