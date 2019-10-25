const express = require("express");
require("./db/mongoose");
const Task = require("./models/task");
const userRouter = require("./routers/user")
const userTask = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;

//Convert input json to object
app.use(express.json());
app.use(userRouter)
app.use(userTask)

app.listen(port, () => {
  console.log("Server up on port ", port);
});
