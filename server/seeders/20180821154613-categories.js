const date = new Date();
const categoryNames = ['Sleepwear', 'Casual', 'Business', 'Formal', 'Athletic', 'Outerwear'];
const categories = [];

categoryNames.forEach((name, index) => {
  const newCategory = {
    id: index + 1,
    name: name,
    createdAt: date,
    updatedAt: date,
  };
  categories.push(newCategory);
});

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
