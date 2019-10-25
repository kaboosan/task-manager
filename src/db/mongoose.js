const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://root:Sofgen1234@kbomango-qdgum.mongodb.net/task-manager-api?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})