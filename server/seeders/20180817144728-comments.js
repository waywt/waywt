const faker = require('faker');

const date = new Date();
const comments = [];
let i = 1;

while (i <= 1600) {
  const newComment = {
    id: i,
    text: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
    UserId: Math.floor(Math.random() * 30) + 1,
    OutfitId: Math.floor(Math.random() * 400) + 1,
    createdAt: date,
    updatedAt: date,
  };

  comments.push(newComment);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
