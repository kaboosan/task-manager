require("../src/db/mongoose");
const User = require("../src/models/user");


//Methode classique promise chaining
// User.findByIdAndUpdate("5db07d8f7befea17b8559169", { age: 23 })
//   .then(res => {
//     console.log(res);
//     return User.countDocuments({ age: 23 });
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   })
  

//Methode await async
  const updateAgeAndCount = async (id, age) => {
        const user = await User.findByIdAndUpdate(id, { age })
        const count = await User.countDocuments({ age: 23 })
        return count
  }

  updateAgeAndCount('5db07d8f7befea17b8559169', 23).then(count => {
      console.log(count);
  }).catch(err=>{
      console.log(err);
  })