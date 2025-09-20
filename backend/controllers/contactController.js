// controllers/contactController.js
const Message = require('../models/messageModel');
// You might also want to integrate an email sending service here (e.g., Nodemailer)

// @desc    Send a contact message
// @route   POST /api/contact
// @access  Public
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please provide name, email, and message' });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    // TODO: Add email notification logic here if desired
    // For example, using Nodemailer to send an email to the admin

    res.json({ msg: 'Message sent successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all contact messages (for admin)
// @route   GET /api/contact
// @access  Private (Admin only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
