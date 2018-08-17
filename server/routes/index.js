const path = require('path');
const express = require('express');
const router = express.Router();
const user = require('./api/user');

// Auth Routes
router.use('/api/users', user);

// API routes

// send the react app if no routes above are hit
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;