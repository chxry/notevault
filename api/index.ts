import express = require("express");
import session = require("express-session");
import passport = require("passport");
import github = require("passport-github2");

import util = require("./util");

const app = express();
const config = util.loadConfig();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new github(
    {
      clientID: config.githubID,
      clientSecret: config.githubSecret,
      callbackURL: config.githubCallback,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

app.use('/api/auth/', require("./auth"));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
