// Write your "projects" router here!
const express = require("express");
const {
  logger,
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", logger, (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch({ message: "error retrieving projects" });
});

router.get("/:id", validateProjectId, logger, (req, res) => {
  res.status(200).json(req.projectId);
});

router.post("/", validateProjectBody, logger, (req, res, next) => {
  Projects.insert(req.body)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProjectBody, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedPost) => {
      res.status(202).json(updatedPost);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(204).json({});
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(202).json(actions);
    })
    .catch(next);
});

module.exports = router;
