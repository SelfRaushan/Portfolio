const express = require('express');
const router = express.Router();
const { testLogin, testGetMe } = require('../controllers/testAuthController');

// @route   POST /api/auth/login
// @desc    Test login user
// @access  Public
router.post('/login', testLogin);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Public (for testing)
router.get('/me', testGetMe);

module.exports = router;
