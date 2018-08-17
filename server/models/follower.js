module.exports = (sequelize) => {
  const Follower = sequelize.define('Follower', {}, {});

  Follower.associate = (models) => {
    Follower.belongsTo(models.User);
    Follower.belongsTo(models.User, { as: 'Follower' });
  };

  return Follower;
};
