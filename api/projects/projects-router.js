// Write your "projects" router here!
const express = require("express");
const { validateProjectId } = require("./projects-middleware");
const Projects = require("./projects-model");
const Actions = require("../actions/actions-model");

const router = express.Router();

router.get("/", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;
