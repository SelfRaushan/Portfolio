// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    // Try to connect with a default URI if DB_URI is not set
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(dbUri);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
