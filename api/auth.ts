import express = require("express");
import passport = require("passport");

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/user", (req, res) => {
  res.status(req.isAuthenticated() ? 200 : 401).end();
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
