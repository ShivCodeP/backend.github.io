const express = require("express");

const app = express();

app.use(express.json());

const authorController = require("./controllers/author.controller");

app.use("/authors",authorController);

module.exports = app;
