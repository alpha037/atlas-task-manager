const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/task');

// Setup Express Router
const router = new express.Router();

// REST API route -> create tasks
router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// REST API route -> view tasks
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) match.completed = req.query.completed === 'true';

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split('_');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// REST API route -> view task by id
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// REST API route -> update task by id
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) return res.status(400).send({ error: 'Invalid Updates' });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// REST API route -> delete task by id
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send({ error: 'Not found' });

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
