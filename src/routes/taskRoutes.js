const express = require('express');
const { createTask, getListTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getListTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
