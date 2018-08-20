const path = require('path');
const router = require('express').Router();
const auth = require('./auth/auth');
const user = require('./api/user');

// Auth Routes
router.use('/auth', auth);

// API routes
router.use('/api/users', user);

// send the react app if no routes above are hit
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;