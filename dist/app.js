import express from 'express';
import CalendarEventRouter from './routes/calendar-event.routes';
import sequelize from './config/connection';
import cors from 'cors';
import dotenv from 'dotenv';
// Initialize environment variables
dotenv.config();
const app = express();
// Middleware for CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware to parse JSON bodies
app.use(express.json());
// Route handling
app.use('/api', CalendarEventRouter);
// Database synchronization
sequelize.sync({ alter: true })
    .then(() => {
    console.log('Database connected and synchronized');
})
    .catch(err => {
    console.error('Database connection error:', err);
});
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
