module.exports = (sequelize, DataTypes) => {
  const Outfit = sequelize.define('Outfit', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 240],
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,       
      },
    },
  }, {});

  Outfit.associate = (models) => {
    Outfit.belongsTo(models.User);
    Outfit.belongsTo(models.Category);
    Outfit.hasMany(models.Comment);
    Outfit.hasMany(models.Like);
    Outfit.hasMany(models.Tag);
    Outfit.belongsToMany(models.Hashtag, { through: models.OutfitHashtag });
  };

  return Outfit;
};
