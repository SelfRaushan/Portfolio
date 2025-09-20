// controllers/blogPostController.js
const BlogPost = require('../models/blogPostModel');

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
exports.getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single blog post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Create a blog post
// @route   POST /api/posts
// @access  Private (assuming authentication is added later)
exports.createBlogPost = async (req, res) => {
  const { title, content, author, tags } = req.body;

  try {
    const newPost = new BlogPost({
      title,
      content,
      author,
      tags: tags.split(',').map(tag => tag.trim()),
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private (assuming authentication is added later)
exports.updateBlogPost = async (req, res) => {
  const { title, content, author, tags } = req.body;

  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post = await BlogPost.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, content, author, tags: tags.split(',').map(tag => tag.trim()) } },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private (assuming authentication is added later)
exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await BlogPost.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
