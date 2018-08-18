const jwt = require('jsonwebtoken');

const createToken = (user, exp) => jwt.sign({
  authenticated: true,
  id: user.id,
}, process.env.JWT_SECRET, { expiresIn: exp });

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
