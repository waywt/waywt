const express = require('express');
const router = express.Router();
const { User, Profile, Follower } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    include: [
      { model: Profile },
      { model: Follower, include: [{ model: User, as: 'Follower' }] },
      { model: Follower, as: 'Following', include: [User] },
    ]
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;