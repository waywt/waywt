module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    text: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 60],
      },
    },
    x: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    y: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  }, {});

  Tag.associate = (models) => {
    Tag.belongsTo(models.User);
    Tag.belongsTo(models.User, { as: 'Tagged' });
    Tag.belongsTo(models.Outfit);
  };

  return Tag;
};
