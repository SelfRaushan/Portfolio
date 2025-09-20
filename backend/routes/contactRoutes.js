// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contactController');

// Define routes for contact messages
router.route('/')
  .post(sendMessage)
  .get(getMessages); // Assuming getMessages is for admin to view messages

module.exports = router;
