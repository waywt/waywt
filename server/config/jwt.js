const jwt = require('jsonwebtoken');

const createTempToken = () => jwt.sign({
  valid: true
}, process.env.JWT_SECRET, { expiresIn: '90s' })

const createToken = (user) => jwt.sign({
  username: user.username,
}, process.env.JWT_SECRET, { expiresIn: '5h' });

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createTempToken,
  createToken,
  decodeToken,
};
