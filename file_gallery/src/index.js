const express = require("express");

const galleryController = require("./controllers/gallery.Controller");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/users",userController);

app.use("/gallerys",galleryController);

module.exports = app;
