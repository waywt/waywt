const {
  Outfit, Category, User, Profile, Comment, Like, Tag, Hashtag
} = require('../models');

const getOutfitDetails = (req, res) => {
  (async() => {
    const outfit = await Outfit.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'description', 'imageUrl'],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
        { 
          model: User, 
          attributes: ['id', 'username'],
          include: [{ model: Profile, attributes: ['avatar']}]
        },
        {
          model: Comment,
          attributes: ['id', 'text'],
          include: [{ model: User, attributes: ['id', 'username']}],
        },
        {
          model: Like,
          attributes: ['id', 'UserId'],
        },
        {
          model: Tag,
          attributes: ['id', 'text', 'x', 'y'],
          include: [{ model: User, as: 'Tagged', attributes: ['id', 'username']}],
        },
        {
          model: Hashtag,
          attributes: ['id', 'text'],
          through: { attributes: [] },   
        }
      ],
    });

    res.json(outfit);
  })();
}

module.exports = {
  getOutfitDetails,
};