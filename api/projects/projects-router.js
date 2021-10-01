// Write your "projects" router here!
const express = require("express");
const { validateProjectId } = require("./projects-middleware");
const Projects = require("./projects-model");
const Actions = require("../actions/actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch({ message: "error retrieving projects" });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;
