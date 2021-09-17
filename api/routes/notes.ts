const router = require("express").Router();

const { users, notes } = require("../mongo");

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
    notes.findOne({ owner: user.id, title: req.params.note }).then((note) => {
      //check if has access or if exists
      res.json({ pages: note.pages });
    });
  });
});


module.exports = router;
