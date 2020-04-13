const express = require("express");
const _ = require("lodash");
const router = express.Router();

const tasksList = [
  {
    id: 0,
    task: "Test",
    isCompleted: true,
  },
];

// Create
router.post("/", (req, res) => {
  const task = req.body.task;
  const newTask = {
    id: Number(_.uniqueId()),
    isCompleted: false,
    task,
  };
  tasksList.push(newTask);
  res.status(201).send(newTask);
});

// Read
router.get("/", (req, res) => {
  res.status(200).send(tasksList);
});

router.get("/:id", (req, res) => {
  const targetId = Number(req.params.id);
  const targetTask = tasksList.find((task) => task.id === targetId);
  res.status(200).send(targetTask);
});

// Update
router.put("/:id", (req, res) => {
  const updatedTask = req.body.task;
  const updatedIsCompleted = Boolean(Number(req.body.isCompleted));
  const targetId = Number(req.params.id);

  const targetIndex = tasksList.findIndex((task) => task.id === targetId);

  tasksList[targetIndex] = {
    id: targetId,
    task: updatedTask ? updatedTask : tasksList[targetIndex].task,
    isCompleted: updatedIsCompleted,
  };
  res.status(204).send();
});

// DELETE
router.delete("/:id", (req, res) => {
  const targetId = Number(req.params.id);
  const targetIndex = tasksList.findIndex((task) => task.id === targetId);
  tasksList.splice(targetIndex, 1);
  res.status(204).send();
});

module.exports = router;
