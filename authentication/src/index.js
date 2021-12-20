const express = require("express");

<<<<<<< HEAD
const { register, login } = require("./controllers/auth.controller");
=======
const {register ,login} = require("./controller/auth.controller");

const productController = require("./controller/product.controller");
>>>>>>> 61b68e33c300249884a56b69fa7686912b257a64

const app = express();

app.use(express.json())

<<<<<<< HEAD
app.post("/register", register);
app.post("/login", login);
=======
app.post("/register",register);

app.post("/login",login);

app.use("/products",productController);
>>>>>>> 61b68e33c300249884a56b69fa7686912b257a64

module.exports = app;