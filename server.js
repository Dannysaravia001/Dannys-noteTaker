const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
const fs = require('fs'); // Import the fs module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", 'utf-8', (error, file) => {
        if (error) throw error;

        let deleteNoteID = req.params.id;
        const parseFile = JSON.parse(file);
        const modifiedFile = parseFile.filter(elem => elem.id != deleteNoteID);

        const stringifiedFile = JSON.stringify(modifiedFile);

        fs.writeFile('./db/db.json', stringifiedFile, 'utf-8', (error) => {
            if (error) throw error;
            console.log("...Note Deleted!");

            // Move this inside the writeFile callback to ensure it's sent after the file update
            res.send(JSON.parse(stringifiedFile));
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});