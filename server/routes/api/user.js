const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Profile, Follower, Category, Outfit, Comment, Like, Tag, Hashtag } = require('../../models');
const passport = require('passport');

router.get('/feed', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      username: req.user.username,
    },
    attributes: ['username'],
    include: [
      { model: Profile, attributes: ['avatar'] },
      { 
        model: Follower, as: 'Following',
        attributes: ['UserId'], 
      },
    ],
  }).then(user => {
    const FollowingIds = [];
    user.Following.forEach(following => {
      FollowingIds.push(following.UserId);
    });
    
    Outfit.findAll({
      where: {
        UserId: {
          [Op.in]: FollowingIds,
        },
      },
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        { 
          model: User, 
          attributes: ['username'],
          include: [{ model: Profile, attributes: ['avatar']}]
        },
        {
          model: Comment,
          attributes: ['id', 'text'],
          include: [{ model: User, attributes: ['username']}],
          order: [['createdAt', 'DESC']],
        },
        {
          model: Like,
          attributes: ['id'],
        },
        {
          model: Tag,
          attributes: ['id', 'text', 'x', 'y'],
          include: [{ model: User, as: 'Tagged', attributes: ['username']}],
        },
        {
          model: Hashtag,
          attributes: ['id', 'text'],
          through: { attributes: [] },   
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: parseInt(req.query.offset) || 0,
    }).then(outfits => {
      res.json([user, outfits]);
    });
  });
});

router.get("/", (req, res) => {
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
