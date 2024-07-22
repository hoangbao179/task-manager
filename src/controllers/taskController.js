const Task = require('../models/taskModel');

const validStatuses = ['Pending', 'Completed'];

const validateStatus = (status) => {
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    return validStatuses.includes(normalizedStatus) ? normalizedStatus : 'Pending';
};

exports.createTask = async (req, res) => {
    const { title, description, status, startDate, dueDate } = req.body;
    const validatedStatus = validateStatus(status);

    try {
        const newTask = new Task({
            title,
            description,
            status: validatedStatus,
            startDate,
            dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getListTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = await Task.findById(id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
