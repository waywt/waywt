const passport = require('passport');
const jwt = require('../../config/jwt');
const { User, Profile, Follower } = require('../../models');
const env = process.env.NODE_ENV || 'development';

require('../../config/passport');


let loginUrl = '/login';
let redirectUrl = '/auth/cb';

if (env === 'development') {
  loginUrl = 'http://localhost:3000/login',
  redirectUrl = 'http://localhost:3000/auth/cb'
}

const createTempToken = (req, res, next) => {
  req.tempToken = jwt.createTempToken();
  next();
};

const validateTempToken = (req, res, next) => {
  if (jwt.decodeToken(req.query.state).valid) {
    next();
  } else {
    res.redirect(loginUrl);
  }
};

const facebookAuthenticate = (req, res, next) => {
  passport.authenticate('auth-user-facebook', {
    state: req.tempToken,
    session: false,
  })(req, res, next);
};

const googleAuthenticate = (req, res, next) => {
  passport.authenticate('auth-user-google', {
    state: req.tempToken,
    session: false,
  })(req, res, next);
};

const redirect = (res, user) => {
  return res.redirect(url.format({
    pathname: redirectUrl,
    query: {
       accessToken: jwt.createToken(user),
       env: env,
       redirect: true,
    },
  }));
}