const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllUsers, getDashboardStats } = require('../controllers/adminController');

// Protect all admin routes
router.use(protect);

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private
router.get('/users', getAllUsers);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics (admin only)
// @access  Private
router.get('/stats', getDashboardStats);

module.exports = router;
