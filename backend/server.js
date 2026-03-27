const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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

// API endpoint for user registration
app.post('/api/register', (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const usersFilePath = path.join(__dirname, 'users.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = JSON.parse(data);

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const newUser = { id: users.length + 1, name, email, password, role }; // Note: plaintext password
        users.push(newUser);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error saving new user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const usersFilePath = path.join(__dirname, 'users.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = JSON.parse(data);

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // In a real app, generate and return a JWT token
            res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Root endpoint to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
