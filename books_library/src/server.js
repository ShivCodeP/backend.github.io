const connect = require("./config/db");

const app = require("./index")

app.listen(2234, async function() {
    await connect();
    console.log("listening port 2234")
})