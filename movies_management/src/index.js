const express = require("express");

const {register, login } = require("./controllers/auth.controller")

const movieController = require("./controllers/movie.controller")

const seatController = require("./controllers/seat.controller");

const showController = require("./controllers/show.controller");

const app = express();

app.use(express.json());

app.post("/register", register);

app.post("/login", login);

app.use("/movies",movieController);

app.use("/shows", showController);

app.use("/seats", seatController);

module.exports = app;