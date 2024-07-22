const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./utils/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});