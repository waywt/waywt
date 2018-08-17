module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OutfitHastags', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    OutfitId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Outfits',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    HashtagId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Hashtags',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('OutfitHashtags'),
};
