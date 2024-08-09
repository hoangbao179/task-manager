const express = require('express');
const app = express();
const CalendarEventRouter = require('./routes/calendar-event.routes');
const sequelize = require('./config/connection');
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api', CalendarEventRouter);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected and synchronized');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
