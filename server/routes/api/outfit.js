const router = require('express').Router();
const { Op } = require('sequelize');
const { 
  User, Profile, Follower, Category, Outfit, Comment, Like, Tag, Hashtag  
} = require('../../models');
const passport = require('passport');

const OutfitsController = require('../../controllers/OutfitsController');
const CommentsController = require('../../controllers/CommentsController');

/* GET api/outfits/following?cat={CategoryId}&offset={offset}
returns outfits of user's Following (limit 10)
if qs contains cat (CategoryId), return only outfits from that category
if qs contains offset, apply offset to query
if no outfits are returned, return suggestions
*/
router.get('/following', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      { 
        model: Follower, as: 'Following',
        attributes: ['UserId'], 
      },
    ],
  }).then(user => {
    const CategoryIds = req.query.cat ? [req.query.cat] : [1,2,3,4,5,6];
    const offset = req.query.offset ? parseInt(req.query.offset) : 0; 
    const FollowingIds = [];

    user.Following.forEach(following => {
      FollowingIds.push(following.UserId);
    });

    if (FollowingIds.length) {
      Outfit.findAll({
        where: {
          UserId: {
            [Op.in]: FollowingIds,
          },
          CategoryId: {
            [Op.in]: CategoryIds
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
        offset: offset,
      }).then(outfits => {
        res.json({outfits: outfits});
      });
    } else {
      Outfit.findAll({
        where: {
          UserId: {
            [Op.not]: req.user.id,
          },
          CategoryId: {
            [Op.in]: CategoryIds
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
        offset: offset,
      }).then(outfits => {
        res.json({suggestedOutfits: outfits});
      });
    }
  });
});

router.post('/', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
    },
    attributes: ['id'],
  }).then(user => {
    Outfit.create({
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      UserId: user.id,
      CategoryId: req.body.categoryId,
    }).then(outfit => {
      (async() => {
        await JSON.parse(req.body.outfitTagsArray).forEach(newTag => {
          Tag.create({
            text: newTag.text,
            x: newTag.x,
            y: newTag.y,
            UserId: user.id,
            OutfitId: outfit.id,
            TaggedId: newTag.TaggedId,
          });
        });
        Outfit.findOne({
          where: {
            id: outfit.id 
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            { model: Category, attributes: ['name'] },
            {
              model: Tag, 
              attributes: { exclude: ['createdAt', 'updatedAt'] }, 
              include: [{ model: User, as: 'Tagged', attributes: ['username']}],
            }
          ],
        }).then(result => {
          res.json(result);
        });
      })();
    });
  });
});

router.get('/:id', (req, res) => {
  OutfitsController.getOutfitDetails(req, res);
});

router.get('/category/:category_name', (req, res) => {
  OutfitsController.getOutfitsByCatName(req, res);
});

router.post('/:id/comments', passport.authenticate('auth-user', {session: false}), (req, res) => {
  CommentsController.createNewComment(req, res);
});

module.exports = router;
