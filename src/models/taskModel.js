const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const taskSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    startDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
});

module.exports = mongoose.model('Task', taskSchema);