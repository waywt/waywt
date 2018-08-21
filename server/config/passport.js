const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PORT = process.env.PORT || 3100;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

let googleCallbackURL;

if (process.env.NODE_ENV) { // production
  googleCallbackURL = 'https://waywt-instagarment.herokuapp.com/auth/google.callback';
} else {
  googleCallbackURL = `http://localhost:${PORT}/auth/google/callback`;
}

passport.use('auth-user', new JWTStrategy(opts, (jwtPayload, cb) => cb(null, jwtPayload)));

passport.use('auth-user-facebook', new FacebookStrategy({
  scope: 'email',
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:${PORT}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'email'],
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

passport.use('auth-user-google', new GoogleStrategy({
  scope: ['profile', 'email'],
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: googleCallbackURL,
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));