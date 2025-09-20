// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// Enable CORS for all origins
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Mount routers
app.use('/api/posts', require('./routes/blogPostRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
// Mount auth routes
app.use('/api/auth', require('./routes/authRoutes'));
// Mount admin routes
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
