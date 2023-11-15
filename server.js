const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes
app.get('/notes', (__req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET Route to catch all
app.get('*', (__req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Listening port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
