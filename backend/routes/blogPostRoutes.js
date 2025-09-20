// routes/blogPostRoutes.js
const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogPostController');

// Define routes for blog posts
router.route('/')
  .get(getBlogPosts)
  .post(createBlogPost);

router.route('/:id')
  .get(getBlogPostById)
  .put(updateBlogPost)
  .delete(deleteBlogPost);

module.exports = router;
