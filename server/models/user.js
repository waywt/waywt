const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9._]+$/i,
        len: [1, 60],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [1, 240],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 60],
      },
    },
    FacebookId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true,
    },
    GoogleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  }, {
    indexes: [
      {
        fields: ['username'],
      },
      {
        fields: ['email'],
      },
      {
        fields: ['FacebookId'],
      },
      {
        fields: ['GoogleId'],
      },
    ],
  });

  User.beforeCreate((user) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  });

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = (models) => {
    User.hasOne(models.Profile);
    User.hasMany(models.Follower);
    User.hasMany(models.Follower, { as: 'Following', foreignKey: 'FollowerId' });
    User.hasMany(models.Outfit);
    User.hasMany(models.Comment);
    User.hasMany(models.Like);
    User.hasMany(models.Tag);
    User.hasMany(models.Tag, { as: 'Tagged', foreignKey: 'TaggedId' });
  };

  return User;
};
