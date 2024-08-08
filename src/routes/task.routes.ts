const express = require('express');
const { createTask, getListTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getListTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
