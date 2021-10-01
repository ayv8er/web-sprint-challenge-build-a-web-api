// Write your "actions" router here!
const express = require("express");
const { logger, validateActionId } = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", logger, (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch({ message: "error retrieving actions" });
});

router.get("/:id", validateActionId, logger, (req, res, next) => {
  res.status(200).json(req.action);
});

module.exports = router;
