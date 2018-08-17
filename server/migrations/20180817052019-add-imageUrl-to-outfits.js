module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Outfits',
    'imageUrl',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),
  down: queryInterface => queryInterface.removeColumn(
    'Outfits',
    'imageUrl',
  ),
};
