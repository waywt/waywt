const faker = require('faker');

const date = new Date();
const brands = [];
let i = 1;

while (i <= 30) {
  const newBrand = {
    id: i,
    name: `${faker.company.companyName()}-${i}`,
    createdAt: date,
    updatedAt: date,
  };

  brands.push(newBrand);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Brands', brands, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Brands', null, {});
  },
};
