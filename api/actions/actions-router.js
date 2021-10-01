// Write your "actions" router here!
const express = require("express");
const {
  logger,
  validateActionId,
  validateActionBody,
} = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", logger, (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch({ message: "error retrieving actions" });
});

router.get("/:id", validateActionId, logger, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateActionBody, logger, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

module.exports = router;
