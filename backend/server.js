const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming json from angular

//Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: 'root', 
  database: 'skifitter'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connection to database success!');
});

// CREATE - Insert user
app.post('/api/users', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  const sql = 'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [email, password, firstName, lastName], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create user' });
    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  });
});

// READ - Get user (?)
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT id, email, firstName, lastName, password FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const user = results[0];
    delete user.password;
    //always delete password - security
    res.status(200).json(user);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});