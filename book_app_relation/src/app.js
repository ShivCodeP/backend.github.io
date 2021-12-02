const express = require("express");

const userController = require('./controllers/users.controller');

const tagController = require("./controllers/tags.controller")

const postController = require("./controllers/posts.controller")

const commentController = require("./controllers/comments.controller")



const app = express();

app.use(express.json());

app.use("/posts",postController)

app.use("/tags",tagController)

app.use("/users",userController)

app.use("/comments",commentController)

module.exports = app;
