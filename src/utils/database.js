const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined in .env file');
}

mongoose.connect(mongoURI, {
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;
