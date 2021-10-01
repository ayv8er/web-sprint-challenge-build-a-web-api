const express = require("express");
const server = express();

const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's Sprint!</h2>`);
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
});

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

server.use(errorHandling);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
