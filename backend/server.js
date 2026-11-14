const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming json from angular

//Setting my databse details
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

// ==========================================
// C: CREATE (Insert a new user)
// ==========================================
app.post('/api/users', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  const sql = 'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [email, password, firstName, lastName], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create user' });
    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  });
});

// ==========================================
// R: READ (Get user details by ID)
// ==========================================
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  const sql = 'SELECT id, email, firstName, lastName FROM users WHERE id = ?';
  
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json(results[0]); // Send back the first matching user
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});