import express from "express";

import { users, notes } from "../mongo";

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).end();
    return;
  }
  notes
    .find({ owner: (req.user as any).id })
    .toArray()
    .then((owned) => {
      Promise.all(
        owned.map((note) =>
          users.findOne({ id: note.owner }).then((user) => ({
            ...note,
            owner: user.username,
          }))
        )
      ).then((owned) => res.json({ owned }));
    });
});

router.get("/:user/:note", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).end();
    return;
  }

  users.findOne({ username: req.params.user }).then((user) => {
    if (user === null) {
      res.status(404).end();
      return;
    }
    notes.findOne({ owner: user.id, title: req.params.note }).then((note) => {
      if (note === null) {
        res.status(404).end();
        return;
      }
      //check if has access
      res.json({ pages: note.pages });
    });
  });
});

module.exports = router;
