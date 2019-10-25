require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("5daf7a28337b3c12b8a72507")
//   .then(res => {
//     console.log(res);
//     return Task.countDocuments({ completed: true });
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

  const deleteTaskAndCount = async id => {
    const user = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: true });
    return count
  }

  deleteTaskAndCount('5db080346920b23a70802c21').then(count => {
    console.log(count);
  }).catch(err => {
    console.log(err);
  })

