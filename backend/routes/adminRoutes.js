const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    getDashboardStats,
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getAllBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getAllMessages,
    deleteMessage,
    getAllUsers
} = require('../controllers/adminController');

// Protect all admin routes
router.use(protect);

// Dashboard routes
router.get('/stats', getDashboardStats);

// Project management routes
router.get('/projects', getAllProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Blog post management routes
router.get('/blog-posts', getAllBlogPosts);
router.post('/blog-posts', createBlogPost);
router.put('/blog-posts/:id', updateBlogPost);
router.delete('/blog-posts/:id', deleteBlogPost);

// Message management routes
router.get('/messages', getAllMessages);
router.delete('/messages/:id', deleteMessage);

// User management routes
router.get('/users', getAllUsers);

module.exports = router;
