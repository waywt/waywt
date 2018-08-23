const router = require('express').Router();
const { User, Outfit, Tag } = require('../../models');
const passport = require('passport');

router.post('/', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      username: req.user.username,
    },
    attributes: ['id'],
  }).then(user => {
    Outfit.create({
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      UserId: user.id,
      CategoryId: req.body.categoryId,
    }).then(outfit => {
      JSON.parse(req.body.outfitTagsArray).forEach(newTag => {
        Tag.create({
          text: newTag.text,
          x: newTag.x,
          y: newTag.y,
          UserId: user.id,
          OutfitId: outfit.id,
          TaggedId: newTag.TaggedId,
        });
      });
      res.json(outfit);
    });
  });
});

module.exports = router;
