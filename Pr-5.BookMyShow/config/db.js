const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pateljenish:patel123@odyssey.bkjon.mongodb.net/?retryWrites=true&w=majority&appName=odyssey/bookmyshow');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

module.exports = connectDB;