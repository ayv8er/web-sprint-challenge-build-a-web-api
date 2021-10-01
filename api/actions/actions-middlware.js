// add middlewares here related to actions
const Actions = require("./actions-model");

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

module.exports = { logger, validateActionId };
