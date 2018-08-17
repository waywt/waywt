module.exports = (sequelize) => {
  const Like = sequelize.define('Like', {}, {});

  Like.associate = (models) => {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Outfit);
  };

  return Like;
};
