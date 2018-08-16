module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'FacebookId',
    {
      allowNull: true,
      type: Sequelize.BIGINT,
      unique: true,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'Users',
    'FacebookId',
  ),
};