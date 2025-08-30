const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin credentials (can store in .env)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // hashed preferred

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) return res.status(401).json({ message: 'Invalid admin credentials' });

    // If storing plain password in .env (less secure):
    if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid admin credentials' });

    // If hashed password in env:
    // const match = await bcrypt.compare(password, ADMIN_PASSWORD);
    // if (!match) return res.status(401).json({ message: 'Invalid admin credentials' });

    const token = jwt.sign({ email: ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
