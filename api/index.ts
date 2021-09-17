import express = require("express");
import session = require("express-session");
import passport = require("passport");
import github = require("passport-github2");

const config = require("./config");
const { mongoConnect, users } = require("./mongo");

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
      users.count({ id: user.id }, { limit: 1 }).then((exists) => {
        if (!exists) {
          users.insertOne({ id: user.id, username: user.username, notes: [] });
        }
      });
      done(null, user);
    }
  )
);

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
