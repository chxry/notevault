import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/notes",
    failureRedirect: "/login",
  })
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/notes",
    failureRedirect: "/login",
  })
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    let user: any = req.user;
    res.json({ username: user.username, provider: user.provider });
  } else {
    res.status(401).end();
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
