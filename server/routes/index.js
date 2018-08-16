const path = require('path');
// const { Router } = require('express');
const router = require("express").Router();

// Auth Routes

// API routes

// send the react app if no routes above are hit
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;