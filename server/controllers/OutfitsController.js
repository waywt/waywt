const sequelize = require('sequelize');
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

const getOutfitsByCatName = (req, res) => {
  (async() => {
    const catIds = {
      Casual: 1,
      Formal: 2,
      Business: 3,
      Sleepwear: 4,
      Athletic: 5,
      Outerwear: 6,
    };

    const outfitCount = await Outfit.findAll({
      where: {
        CategoryId: catIds[req.params.category_name] || 0,
      },
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'outfit_count']]
    })

    const outfits = await Outfit.findAll({
      where: {
        CategoryId: catIds[req.params.category_name] || 0,
      },
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
      order: [['createdAt', 'DESC']],
      limit: 24,
      offset: parseInt(req.query.offset) || 0,
    });

    res.json({outfitCount: outfitCount, outfits: outfits});
  })()
}

module.exports = {
  getOutfitDetails,
  getOutfitsByCatName
};