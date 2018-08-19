const router = require('express').Router();
const passport = require('passport');
const jwt = require('../../config/jwt');
const { User } = require('../../models');

require('../../config/passport');

const createTempToken = (req, res, next) => {
  req.tempToken = jwt.createTempToken();
  next();
};

const validateTempToken = (req, res, next) => {
  if (jwt.decodeToken(req.query.state).valid) {
    next();
  } else {
    res.redirect('/login');
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

router.get('/facebook', createTempToken, facebookAuthenticate);

router.get('/facebook/callback', validateTempToken, passport.authenticate('auth-user-facebook', { session: false }), (req, res) => {
  (async () => {
    const fbUser = req.user._json;
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

      return res.render('redirect', {
        accessToken: jwt.createToken(user),
        username: user.username,
      });
    }
    const newUser = await User.create({
      username: fbUser.name.replace(/ /g, '_'),
      email: fbUser.email,
      FacebookId: fbUser.id,
    });

    return res.render('redirect', {
      accessToken: jwt.createToken(newUser),
      username: fbUser.name.replace(/ /g, '_'),
    });
  })();
});

router.get('/google', createTempToken, googleAuthenticate);

router.get('/google/callback', validateTempToken, passport.authenticate('auth-user-google', { session: false }), (req, res) => {
  (async () => {
    const googleUser = req.user._json;
    let user;

    user = await User.findOne({ where: { GoogleId: googleUser.id } });
    user = user || await User.findOne({ where: { email: googleUser.emails[0].value } });

    if (user) {
      if (!user.GoogleId) {
        await User.update({
          GoogleId: googleUser.id,
        },
        {
          where: {
            email: googleUser.emails[0].value,
          },
        });
      }

      return res.render('redirect', {
        accessToken: jwt.createToken(user),
        username: user.username,
      });
    }
    const newUser = await User.create({
      username: googleUser.displayName.replace(/ /g, '_'),
      email: googleUser.emails[0].value,
      GoogleId: googleUser.id,
    });

    return res.render('redirect', {
      accessToken: jwt.createToken(newUser),
      username: googleUser.displayName.replace(/ /g, '_'),
    });
  })();
});

router.post('/signup', (req, res) => {
  (async () => {
    const { username, email, password } = req.body;
    let user;

    user = await User.findOne({ where: { username: username } });

    if (user) {
      return res.json({ error: { username: 'Username already taken.'} });
    } else {
      user = await User.findOne({ where: { email: email } });
    }
    
    if (user) {
      return res.json({ error: { email: 'User with this email already exists.'} });
    } 
   
    try {
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
      });
      return res.json({
        accessToken: jwt.createToken(newUser),
        username: username,
      });
    } catch (e) {
      return res.json({ error: e.errors });
    }
  })();
});

router.post('/login', (req, res) => {
  (async () => {
    const { usernameOrEmail, password } = req.body;
    let user;

    if (/@/.test(usernameOrEmail)) {
      user = await User.findOne({ where: { email: usernameOrEmail }});
    } else {
      user = await User.findOne({ where: { username: usernameOrEmail }});
    }
   
    if (!user) return res.json({error: { usernameOrEmail: 'Could not find user.'}});

    if (!user.password && user.FacebookId) {
      res.redirect('/auth/facebook');
    } else if (!user.password && user.GoogleId) {
      res.redirect('/auth/google');
    } else if (user.validPassword(password)) {
      return res.json({
        accessToken: jwt.createToken(user),
        username: user.username,
      });
    } else {
      return res.json({ error: { password: 'Invalid Password.'}});
    }
  })();
});

module.exports = router;
