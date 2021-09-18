import express from "express";
import session from "express-session";
import passport from "passport";
import github from "passport-github2";
import twitter from "passport-twitter";

import config from "./config";
import { mongoConnect, users } from "./mongo";

const app = express();
mongoConnect();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  users.findOne({ id }).then((doc) => done(null, doc));
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
    (accessToken, refreshToken, user, done) => {
      onLogin(user);
      done(null, user);
    }
  )
);

passport.use(
  new twitter(
    {
      consumerKey: config.twitterKey,
      consumerSecret: config.twitterSecret,
      callbackURL: config.twitterCallback,
    },
    (token, tokenSecret, user, done) => {
      onLogin(user);
      done(null, user);
    }
  )
);

const onLogin = (user) => {
  users.count({ id: user.id }, { limit: 1 }).then((exists) => {
    if (!exists) {
      users.insertOne({
        id: user.id,
        username: user.username,
        provider: user.provider,
      });
    }
  });
};

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
