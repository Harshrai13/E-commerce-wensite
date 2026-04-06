const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');

// POST - Subscribe to newsletter
router.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const db = readDB();
    if (!db.newsletter) db.newsletter = [];
    
    // Check if duplicate
    if (db.newsletter.includes(email)) {
      return res.status(400).json({ message: 'Already subscribed!' });
    }

    db.newsletter.push(email);
    writeDB(db);

    res.status(201).json({ message: 'Subscribed successfully! Welcome to the LUXE family.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error subscribing to newsletter' });
  }
});

// GET - List subscribers (Admin)
router.get('/', (req, res) => {
  try {
    const db = readDB();
    res.json(db.newsletter || []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscribers' });
  }
});

module.exports = router;
