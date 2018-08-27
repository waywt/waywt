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
    let catId;

    if (req.params.category_name === 'Casual') {
      catId = 1;
    } else if (req.params.category_name === 'Formal') {
      catId = 2;
    } else if (req.params.category_name === 'Business') {
      catId = 3;
    } else if (req.params.category_name === 'Sleepwear') {
      catId = 4;
    } else if (req.params.category_name === 'Athletic') {
      catId = 5;
    } else  {
      catId = 6;
    }

    const outfits = await Outfit.findAll({
      where: {
        CategoryId: catId,
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

    res.json(outfits);
  })()
}

module.exports = {
  getOutfitDetails,
  getOutfitsByCatName
};