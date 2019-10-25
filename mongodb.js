const { MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID();

console.log(id);

const connectionURL =
  "mongodb+srv://root:Sofgen1234@kbomango-qdgum.mongodb.net/test?retryWrites=true&w=majority";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect");
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Kamel',
    //     age: 35
    // }, (error, result) => {
    //     if(error){
    //         return console.log("Error during inserting data");
    //     }
    //     console.log("Data inserted : " + result);
    // })$

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: 'Ali',
    //       age: 1
    //     },
    //     { name: 'Younes',
    //       age: 8 }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Error during inserting data");
    //     }
    //     console.log("Data inserted : " + result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Buy a book",
    //       completed: true
    //     },
    //     {
    //         description: "Cook a fish",
    //         completed: false
    //     },
    //     {
    //         description: "Fetch kids",
    //         completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Error during inserting data");
    //     }
    //     console.log("Data inserted : " + result.ops);
    //   }
    // );

    //READ
//Si on recherche par _id il faut le convertir en vrai Id a partir de ObjectID
    // db.collection("users").findOne(
    //     {
    //       _id: new ObjectID("5dad4a315e0a5750b0c77aa4")
    //     },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Error during reading data");
    //     }
    //     console.log(user);
    //   }
    // );

    // method find retur a cursor
    // db.collection("users").find({age: 35}).toArray( (error, users) => {
    //     console.log(users);
    // });

    // db.collection("users").find({age: 35}).count( (error, count) => {
    //     console.log(count);
    // });

    // db.collection("tasks").findOne({_id: new ObjectID("5dad4d8a03d7213facac1711")}, (error, task) => {
    //     console.log(task);
    // });

    // db.collection("tasks").find({completed: true}).toArray((error, tasks) => {
    //     console.log(tasks);
    // });

    //UPDATE
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5dad47b74c0a780674620970')
    // }, {
    //     $set: {
    //         name: 'Samira'
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(error=>{
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(error=>{
    //     console.log(error);
    // })

    //DELETE

    db.collection('users').deleteMany({
        name: 'Ali'
    }).then(result=>{
        console.log(result);
    }).catch(error=>{
        console.log(error)
    })
  }
);
