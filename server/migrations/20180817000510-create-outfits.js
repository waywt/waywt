module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Outfits', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
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
    CategoryId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    BrandId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'Brands',
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
  down: queryInterface => queryInterface.dropTable('Outfits'),
};
