const fs = require('fs');
const path = require('path');
const express = require('express'); 
const {v4: uuidv4} = require('uuid'); 

const router = express.Router();
const dbPath = path.join(__dirname,'../db.json');

//GET routes to fetch notes 

router.get('/notes', (req, res) => {
    try {
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(notes);
    } catch (error) {
       console.error(error);
       res.status(500).send('Server Error');
    }
});

