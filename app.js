const express = require("express");

const app = express();

app.get("/", (req,res) => {
    res.send("Welcome to REST API")
})

app.get("/user",(req,res) => {
    var data = require("./MOCK_DATA.json")
    res.send(data);
})

app.listen(2345, () => {
    console.log("app is listening port 2345")
})