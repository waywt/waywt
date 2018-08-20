module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'GoogleId',
    {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
  ),
  down: queryInterface => queryInterface.removeColumn(
    'Users',
    'GoogleId',
  ),
};
