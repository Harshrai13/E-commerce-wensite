const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dbPath = path.join(__dirname, '../data/database.json');
const JWT_SECRET = 'luxe_super_secret_key_2026';

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// GET - List Users
router.get('/', (req, res) => {
  try {
    const db = readDB();
    const safeUsers = (db.users || []).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }));
    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error reading users database' });
  }
});

// POST - Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();
  const existingUser = db.users?.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const newUser = {
    id: (db.counters.users || 0) + 1,
    name, email, password,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  db.users = db.users || [];
  db.users.push(newUser);
  db.counters.users = newUser.id;
  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: newUser.id, name, email, role: 'user' } });
});

// POST - Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users?.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
});

module.exports = router;
