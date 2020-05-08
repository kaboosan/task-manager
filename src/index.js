const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user")
const userTask = require("./routers/task")

const app = express();
const port = process.env.PORT || 3005;

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000 //1MB
  },
  fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(doc|docx)$/)){
        return cb(new Error('Please upload a Word document'))
     }   

     cb(undefined, true)
    
    // cb(new Error('File must be a PDF'))
    // cb(undefined, true)
    // cb(undefined, false)
  } 
})

const errorMiddleware = (req, res, next) => {
  throw new Error("from my middleware")
}
app.post('/upload', errorMiddleware,  (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

app.use(express.json());
app.use(userRouter)
app.use(userTask)

app.listen(port, () => {
  console.log("Server up on port ", port);
});

