const path = require('path');
const express = require('express');
const router = express.Router();

// Auth Routes

// API routes

// send the react app if no routes above are hit
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;