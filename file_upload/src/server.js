const app = require("./index");

const connect = require("./configs/db");

app.listen(2234, async () => {
    await connect();
    console.log("listening the port 2234")
})
