const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

router.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedProps = ["description", "completed"];
  const isAllowed = updates.every(update => allowedProps.includes(update));

  if (!isAllowed) {
    return res.status(400).send({
      error: "Invalid update!"
    });
  }

  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update=>{
      task[update] = req.body[update]
    })
    await task.save()
    res.send(task);

  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router