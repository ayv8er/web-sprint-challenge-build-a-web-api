// Write your "actions" router here!
const express = require("express");
const {} = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch({ message: "error retrieving actions" });
});

module.exports = router;
