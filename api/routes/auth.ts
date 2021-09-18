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

router.get("/user", (req, res) => 
  req.isAuthenticated() ? res.json(req.user) : res.status(401).end()
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
