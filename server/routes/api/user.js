const router = require('express').Router();
const { User, Profile, Follower, Outfit } = require('../../models');

router.get('/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    include: [
      { model: Profile },
      { model: Follower, include: [{ model: User, as: 'Follower' }] },
      { model: Follower, as: 'Following', include: [User] },
    ],
  }).then(result => {
    res.json(result);
  });
});

router.get('/', (req, res) => {
  User.findAll({
    include: [
      { model: Profile },
      { model: Follower, include: [{ model: User, as: 'Follower' }] },
      { model: Follower, as: 'Following', include: [User] },
    ],
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;