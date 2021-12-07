const express = require("express");

const app = express();

const userController = require("./controllers/user.controller");

const adminController = require("./controllers/admin.controller");

app.use(express.json());

app.use("/users", userController)

app.use("/admins", adminController)

module.exports = app;