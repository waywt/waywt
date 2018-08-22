const { Outfit, Hashtag } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const date =  new Date();
    const outfits = await Outfit.findAll({});
    const hashtags = await Hashtag.findAll({});
    const outfitHashtags = [];
    let i = 0;

    while (i < 1000) {
      const newOutfitHashtag = {
        OutfitId: Math.floor(Math.random() * outfits.length) + 1,
        HashtagId: Math.floor(Math.random() * hashtags.length) + 1,
        createdAt: date,
        updatedAt: date
      }
      outfitHashtags.push(newOutfitHashtag);
      i += 1;
    }

    await queryInterface.bulkInsert('OutfitHashtags', outfitHashtags, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('OutfitHashtags', {}, {});
  },
};
