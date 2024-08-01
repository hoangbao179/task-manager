const Task = require('../entity/Task');
const TaskStatus = require('../enums/TaskStatus');


const validateStatus = (status) => {
    return Object.values(TaskStatus).includes(status) ? status : TaskStatus.PENDING;
};


const createTask = async ({ title, description, status, startDate, dueDate }) => {
    const validatedStatus = validateStatus(status);
    return await Task.create({ title, description, status: validatedStatus, startDate, dueDate });
};

const getListTasks = async () => {
    try {
        return await Task.findAll();
    } catch (error) {
        throw error;
    }
};

const getTaskById = async (id) => {
    return await Task.findByPk(id);
};

const updateTask = async (id, { title, description, status, dueDate }) => {
    const validatedStatus = validateStatus(status);
    return await Task.update({ title, description, status: validatedStatus, dueDate }, { where: { id } });
};

const deleteTask = async (id) => {
    return await Task.destroy({ where: { id } });
};

module.exports = {
    createTask,
    getListTasks,
    getTaskById,
    updateTask,
    deleteTask,
};