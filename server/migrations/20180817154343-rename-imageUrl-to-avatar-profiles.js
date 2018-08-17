module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.renameColumn(
    'Profiles',
    'imageUrl',
    'avatar',
  ),
  down: queryInterface => queryInterface.renameColumn(
    'Profiles',
    'avatar',
    'imageUrl',
  ),
};
