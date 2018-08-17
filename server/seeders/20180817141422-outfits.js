const faker = require('faker');

const date = new Date();
const outfits = [];
let i = 1;

while (i <= 400) {
  const newOutfit = {
    id: i,
    description: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
    imageUrl: 'https://placekitten.com/420/320',
    UserId: Math.floor(Math.random() * 30) + 1,
    CategoryId: Math.floor(Math.random() * 14) + 1,
    BrandId: Math.floor(Math.random() * 30) + 1,
    createdAt: date,
    updatedAt: date,
  };

  outfits.push(newOutfit);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Outfits', outfits, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Outfits', null, {});
  },
};
