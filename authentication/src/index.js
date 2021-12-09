const express = require("express");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

// app.use("/evaluations", evaluationController);

app.use("/users", userController);

// app.use("/students", studentController);

module.exports = app;
