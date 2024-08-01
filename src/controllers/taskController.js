const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
  const { title, description, status, startDate, dueDate } = req.body;

  try {
    const newTask = await taskService.createTask({ title, description, status, startDate, dueDate });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListTasks = async (req, res) => {
  try {
    const tasks = await taskService.getListTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.getTaskById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;
  try {
    const updatedTask = await taskService.updateTask(id, { title, description, status, dueDate });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskService.deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
