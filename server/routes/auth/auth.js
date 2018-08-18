const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('../config/jwt');
const { User } = require('../models');

require('../config/passport');

const createTempToken = (req, res, next) => {
  req.facebookConnectToken = jwt.createToken({ id: 'fbConnectToken' }, '90s');
  next();
};

const validateTempToken = (req, res, next) => {
  if (jwt.decodeToken(req.query.state).id === 'fbConnectToken') {
    next();
  } else {
    res.redirect('/login');
  }
};

const facebookAuthenticate = (req, res, next) => {
  passport.authenticate('auth-customer-facebook', {
    state: req.facebookConnectToken,
    session: false,
  })(req, res, next);
};

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/login/facebook', createTempToken, facebookAuthenticate);

router.get('/login/facebook/callback', validateTempToken, passport.authenticate('auth-customer-facebook', { session: false }), (req, res) => {
  (async () => {
    const fbUser = req.user._json; // eslint-disable-line no-underscore-dangle
    let user;

    user = await User.findOne({ where: { FacebookId: fbUser.id } });
    user = user || await User.findOne({ where: { email: fbUser.email } });

    if (user) {
      if (!user.FacebookId) {
        await User.update({
          FacebookId: fbUser.id,
        },
        {
          where: {
            email: fbUser.email,
          },
        });
      }

      return res.render('temp', {
        layout: false,
        accessToken: jwt.createToken(user, '1w'),
        name: fbUser.name,
      });
    }
    const newUser = await User.create({
      name: fbUser.name,
      email: fbUser.email,
      FacebookId: fbUser.id,
    });

    return res.render('temp', {
      layout: false,
      accessToken: jwt.createToken(newUser, '1w'),
      name: fbUser.name,
    });
  })();
});

router.post('/signup', (req, res) => {
  (async () => {
    const userWithEmail = await User.findOne({ where: { email: req.body.email } });

    if (userWithEmail) {
      return res.json({ error: 'User with this email already exists.' });
    }
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({
        accessToken: jwt.createToken(newUser, '1w'),
        name: req.body.name,
      });
    } catch (e) {
      return res.json({ error: e.errors });
    }
  })();
});

router.post('/login', (req, res) => {
  (async () => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && user.validPassword(password)) {
      return res.json({
        accessToken: jwt.createToken(user, '1w'),
        name: user.name,
      });
    } if (user && !user.validPassword(password)) {
      return res.json({ error: 'Invalid Password.' });
    }
    return res.json({ error: 'Could not find user with this email.' });
  })();
});

module.exports = router;
