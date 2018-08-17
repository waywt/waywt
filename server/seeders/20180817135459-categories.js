const faker = require('faker');

const date = new Date();
const categories = [];
let i = 1;

while (i <= 15) {
  const newCategory = {
    id: i,
    name: `${faker.commerce.department()}-${i}`,
    createdAt: date,
    updatedAt: date,
  };

  categories.push(newCategory);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
