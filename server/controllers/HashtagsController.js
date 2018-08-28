const { Hashtag, Outfit, Category, Like, Comment } = require('../models');

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
              model: Category,
              attributes: ['id', 'name'],
            },
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
-A
    res.json(hashtagWithOutfits);
  })();
}

module.exports = {
  getHashtagOutfits
};