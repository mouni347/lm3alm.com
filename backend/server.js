const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API endpoint to get the list of wilayas
app.get('/api/wilayas', (req, res) => {
    fs.readFile(path.join(__dirname, 'wilayas.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading wilayas data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Root endpoint to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
