const sequelize = require('sequelize');
const { Hashtag, Outfit, Like, Comment } = require('../models');

const getHashtagOutfits = (req, res) => {
  (async() => {
    const hashtagWithOutfits = await Hashtag.findOne({
      where: {
        text: req.params.text,
      },
      attributes: ['text'],
      include: [
        {
          model: Outfit,
          attributes: { exclude: ['description', 'updatedAt'] },
          include: [
            {
              model: Like,
              attributes: ['id'],
            },
            { 
              model: Comment,
              attributes: ['id'],
            }
          ],
        },
      ]
    });

    res.json(hashtagWithOutfits);
  })();
}

module.exports = {
  getHashtagOutfits
};