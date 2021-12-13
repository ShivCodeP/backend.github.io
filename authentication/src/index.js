const express = require("express");

const {register ,login} = require("./controller/auth.controller");

const productController = require("./controller/product.controller");

const app = express();

app.use(express.json())

app.post("/register",register);

app.post("/login",login);

app.use("/products",productController);

module.exports = app;