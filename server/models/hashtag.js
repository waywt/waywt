module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 60],
      },
    },
  }, {});

  Hashtag.associate = (models) => {
    Hashtag.belongsToMany(models.Outfit, { through: models.OutfitHashtag });
  };

  return Hashtag;
};
