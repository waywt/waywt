module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tags', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: true,    
    },
    x: {
      type: Sequelize.DECIMAL(7,4),
      allowNull: false,
    },
    y: {
      type: Sequelize.DECIMAL(7,4),
      allowNull: false,
    },
    UserId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    TaggedId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Tags'),
};
