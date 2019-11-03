const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user")
const userTask = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;

// //add middleware
// app.use((req, res, next) => {
//   res.status(503).send('Site is on maintenance mode')
// })

//Convert input json to object
app.use(express.json());
app.use(userRouter)
app.use(userTask)

app.listen(port, () => {
  console.log("Server up on port ", port);
});

