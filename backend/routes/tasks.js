const express = require("express");
const db = require("../models");
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
  db.task
    .create({
      isCompleted: false,
      task,
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Read
router.get("/", (req, res) => {
  db.task
    .findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
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
