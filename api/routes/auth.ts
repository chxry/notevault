import express = require("express");
import passport = require("passport");

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/notes",
    failureRedirect: "/login",
  })
);

router.get("/user", (req, res) =>
  req.isAuthenticated()
    ? res.status(200).json({ username: (req.user as any).username })
    : res.status(401).end()
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
