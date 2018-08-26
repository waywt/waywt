const router = require('express').Router();
const _ = require('lodash');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { 
  User, Profile, Follower, Category, Outfit, Comment, Like, Tag, Hashtag 
} = require('../../models');
const passport = require('passport');

router.get('/feed', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
    },
    attributes: ['id', 'username'],
    include: [
      { model: Profile, attributes: ['avatar'] },
      { 
        model: Follower, as: 'Following',
        attributes: ['UserId'], 
      },
    ],
  }).then(user => {
    const FollowingIds = user.Following.map(f => f.UserId);

    if (FollowingIds.length) {
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
            attributes: ['id', 'name'],
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
        res.json({user: user, following: FollowingIds, outfits: outfits});
      });
    } else {
      User.findAll({
        where: {
          id: {
            [Op.not]: req.user.id,
          }
        },
        attributes: ['id', 'username'],
        include: [{ model: Profile, attributes: ['avatar', 'header']}],
      }).then(users => {
        res.json({user: user, following: FollowingIds, suggestions: _.shuffle(users).slice(0, 10)});
      });
    }
  });
});

router.get('/:username', (req, res) => {
  (async() => {
    const user = await  User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['id', 'username', [sequelize.fn('COUNT', sequelize.col('Outfits.id')), 'outfit_count']],
      include: [
        { model: Profile, attributes: ['avatar', 'header', 'summary'] },
        { model: Outfit, attributes: [] },
      ],
    });
    const follower = await Follower.findAll({
      where: {
        UserId: user.id
      },
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'follower_count']]
    });
    const following = await Follower.findAll({
      where: {
        FollowerId: user.id
      },
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'following_count']]
    });
    
    res.json([user, follower, following]);
  })();
});

router.post('/:id/follow', passport.authenticate('auth-user', {session: false}), (req, res) => {
  (async() => {
    const alreadyFollowing = await Follower.findOne({
      where: {
        UserId: req.params.id,
        FollowerId: req.user.id,
      },
    });

    if (alreadyFollowing) {
      res.json({error: 'Already following this user.'});
    } else {
      const newFollowing = await Follower.create({
        UserId: req.params.id,
        FollowerId: req.user.id
      });
      res.json(newFollowing);
    }
  })();
});

router.post('/:id/unfollow', passport.authenticate('auth-user', {session: false}),(req, res) => {
  (async() => {
    const alreadyFollowing = await Follower.findOne({
      where: {
        UserId: req.params.id,
        FollowerId: req.user.id,
      },
    });

    if (!alreadyFollowing) {
      res.json({error: 'Not following this user.'});
    } else {
      const deleteResult = await Follower.destroy({
        where: {
          UserId: req.params.id,
          FollowerId: req.user.id,
        },
      });
      res.json(deleteResult);
    }
  })();
});

module.exports = router;
