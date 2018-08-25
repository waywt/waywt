const jwt = require('jsonwebtoken');

const createTempToken = () => jwt.sign({
  valid: true
}, process.env.JWT_SECRET, { expiresIn: '90s' })

const createToken = (user) => jwt.sign({
  id: user.id,
  username: user.username,
}, process.env.JWT_SECRET, { expiresIn: '1w' });

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createTempToken,
  createToken,
  decodeToken,
};
