module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Profiles',
    'imageUrl',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),
  down: queryInterface => queryInterface.removeColumn(
    'Profiles',
    'imageUrl',
  ),
};
