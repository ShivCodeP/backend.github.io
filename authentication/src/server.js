const app = require("./index");
<<<<<<< HEAD
const connect = require("./configs/db");

app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
=======
const connect = require('./config/db');

app.listen(2000, async()=>{
    await connect();
    console.log("Server is running on port 2000");
>>>>>>> 61b68e33c300249884a56b69fa7686912b257a64
});
