const connect = require("./config/db");
const app = require("./app")

app.listen(2345, async function () {
    await connect();
    console.log("listening on port 2345");
});