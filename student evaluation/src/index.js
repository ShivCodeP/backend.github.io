const express = require("express");

const evaluationController = require("./controllers/evaluation.controller");

const studentController = require("./controllers/student.controller");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/evaluations", evaluationController);

app.use("/users", userController);

app.use("/students", studentController);

module.exports = app;
