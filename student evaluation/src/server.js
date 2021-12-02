const app = require("index.js");

const connect = require("./config/db");

app.listen(2234,async () => {
    await connect();
    console.log("listening on port 2234")
})