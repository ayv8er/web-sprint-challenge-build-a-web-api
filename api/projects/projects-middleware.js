// add middlewares here related to projects
const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleString()} ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const validId = await Projects.get(req.params.id);
    if (!validId) {
      next({ status: 404, message: "project not found" });
    } else {
      req.projectId = validId;
      next();
    }
  } catch (err) {
    next({ message: "validating project ID error" });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    next({ status: 400, message: "missing required name" });
  } else if (!description || !description.trim()) {
    next({ status: 400, message: "missing required description" });
  } else {
    next();
  }
}

module.exports = { logger, validateProjectId, validateProjectBody };
