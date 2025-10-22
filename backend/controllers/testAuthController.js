// Test authentication controller for testing without MongoDB
const jwt = require('jsonwebtoken');

// Mock user data for testing
const testUser = {
    _id: '507f1f77bcf86cd799439011',
    username: 'admin',
    email: 'admin@test.com',
    name: 'Test Admin'
};

// @desc    Test login endpoint
// @route   POST /api/auth/login
// @access  Public
const testLogin = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Simple test credentials
        const validCredentials = (
            (email === 'admin@test.com' || username === 'admin') && 
            password === 'admin123'
        );

        if (validCredentials) {
            const token = jwt.sign(
                { id: testUser._id }, 
                process.env.JWT_SECRET || 'test_secret', 
                { expiresIn: '30d' }
            );

            res.json({
                _id: testUser._id,
                username: testUser.username,
                email: testUser.email,
                name: testUser.name,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const testGetMe = async (req, res) => {
    try {
        res.json(testUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    testLogin,
    testGetMe,
};
