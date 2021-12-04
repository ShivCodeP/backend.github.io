const express = require("express");

const app = express();

const userController = require("./controllers/user.controller");

app.use("/users", userController)

app.use(express.json());

module.exports = app;