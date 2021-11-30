const express = require("express");
const users = require("./user.json");

const app = express();

app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Welcome to REST API")
// })

app.get("/", (req, res) => {
    res.send(users);
})

app.post("/", (req,res) => {

    const newUsers = [...users, req.body]

    res.send({ newUsers })

})

app.patch("/:email",(req, res) => {
    // console.log(req.params.email);
    const newUsers = users.map((user) => {
        if(req.params.email === user.email) {

            if(req.body.id) user.id = req.body.id;
            if(req.body.first_name) user.first_name = req.body.first_name;
            if(req.body.last_name) user.last_name = req.body.last_name;
            if(req.body.email) user.email = req.body.email;
            if(req.body.gender) user.gender = req.body.gender;

        }
        return user;
    })

    res.send(newUsers);
})

app.delete("/:email",(req,res) => {
    const newUsers = users.filter((user) => user.email !== req.params.email)

    res.send(newUsers);
})

app.get("/user/:email",(req,res) => {
    const newUsers = users.filter((user) => user.email === req.params.email)

    res.send(newUsers)
})

app.listen(2345, () => {
    console.log("app is listening port 2345")
})