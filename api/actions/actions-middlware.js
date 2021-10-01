// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleString()} ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

async function validateActionId(req, res, next) {
  try {
    const validAction = await Actions.get(req.params.id);
    if (!validAction) {
      next({ status: 404, message: "action not found" });
    } else {
      req.action = validAction;
      next();
    }
  } catch (err) {
    next({ message: "validating action ID error" });
  }
}

async function validateActionBody(req, res, next) {
  const { project_id, description, notes } = req.body;

  try {
    const validProject = await Projects.get(project_id);
    if (!validProject) {
      next({ status: 404, message: "project id not found" });
    } else {
      if (!project_id) {
        next({ status: 400, message: "missing project id" });
      } else if (!description || !description.trim()) {
        next({ status: 400, message: "missing required description" });
      } else if (!notes || !notes.trim()) {
        next({ status: 400, message: "missing required notes" });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { logger, validateActionId, validateActionBody };
