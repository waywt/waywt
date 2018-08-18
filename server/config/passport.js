const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use('auth-user', new JWTStrategy(opts, (jwtPayload, cb) => cb(null, jwtPayload)));

passport.use('auth-user-facebook', new FacebookStrategy({
  scope: 'email',
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:${process.env.PORT}/login/facebook/callback`,
  profileFields: ['id', 'displayName', 'email'],
}, ((accessToken, refreshToken, profile, cb) => cb(null, profile))));
