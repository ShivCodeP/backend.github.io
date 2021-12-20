const express = require("express");

const {register, login } = require("./controllers/auth.controller")

const theatreController = require("./controllers/theatre.model");

const screenController = require("./controllers/screen.controller");

const userController = require("./controllers/user.controller");

const movieController = require("./controllers/movie.controller")

const seatController = require("./controllers/seat.controller");

const showController = require("./controllers/show.controller");

const app = express();

app.use(express.json());

app.post("/register", register);

app.post("/login", login);

app.use("/screens", screenController)

app.use("/theatres", theatreController)

app.use("/users", userController)

app.use("/movies",movieController);

app.use("/shows", showController);

app.use("/seats", seatController);

module.exports = app;