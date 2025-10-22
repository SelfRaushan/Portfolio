const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const BlogPost = require('../models/blogPostModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        // Check if database is connected
        const isDbConnected = mongoose.connection.readyState === 1;
        
        let totalProjects, totalBlogPosts, totalMessages, totalUsers;
        
        if (isDbConnected) {
            totalProjects = await Project.countDocuments();
            totalBlogPosts = await BlogPost.countDocuments();
            totalMessages = await Message.countDocuments();
            totalUsers = await User.countDocuments();
        } else {
            // Provide mock data when database is not connected
            totalProjects = 12;
            totalBlogPosts = 8;
            totalMessages = 25;
            totalUsers = 5;
        }

        let recentProjects, recentBlogPosts, recentMessages;
        let projectsByMonth, blogPostsByMonth, messagesByMonth;
        let technologyStats, tagStats, weeklyActivity, engagementMetrics;

        if (isDbConnected) {
            // Get recent activity
            recentProjects = await Project.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('title createdAt technologies');

            recentBlogPosts = await BlogPost.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('title createdAt author tags');

            recentMessages = await Message.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('name email createdAt message');

            // Get data for charts
            projectsByMonth = await Project.aggregate(getMonthlyAggregationPipeline());
            blogPostsByMonth = await BlogPost.aggregate(getMonthlyAggregationPipeline());
            messagesByMonth = await Message.aggregate(getMonthlyAggregationPipeline());
            
            // Get technology usage stats
            technologyStats = await Project.aggregate([
                { $unwind: '$technologies' },
                { $group: { _id: '$technologies', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]);

            // Get blog post tags stats
            tagStats = await BlogPost.aggregate([
                { $unwind: '$tags' },
                { $group: { _id: '$tags', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]);

            // Get weekly activity data
            weeklyActivity = await getWeeklyActivityData();

            // Get engagement metrics
            engagementMetrics = await getEngagementMetrics();
        } else {
            // Provide mock data when database is not connected
            recentProjects = [
                { _id: '1', title: 'E-commerce Website', createdAt: new Date().toISOString(), technologies: ['React', 'Node.js', 'MongoDB'] },
                { _id: '2', title: 'Mobile App', createdAt: new Date(Date.now() - 86400000).toISOString(), technologies: ['React Native', 'Firebase'] },
                { _id: '3', title: 'Portfolio Website', createdAt: new Date(Date.now() - 172800000).toISOString(), technologies: ['React', 'Tailwind CSS'] }
            ];

            recentBlogPosts = [
                { _id: '1', title: 'Getting Started with React', author: 'Admin', createdAt: new Date().toISOString(), tags: ['React', 'JavaScript', 'Frontend'] },
                { _id: '2', title: 'Node.js Best Practices', author: 'Admin', createdAt: new Date(Date.now() - 86400000).toISOString(), tags: ['Node.js', 'Backend', 'JavaScript'] },
                { _id: '3', title: 'MongoDB Aggregation', author: 'Admin', createdAt: new Date(Date.now() - 172800000).toISOString(), tags: ['MongoDB', 'Database'] }
            ];

            recentMessages = [
                { _id: '1', name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString(), message: 'Great portfolio! Would love to collaborate.' },
                { _id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date(Date.now() - 86400000).toISOString(), message: 'Amazing projects! Very impressive work.' },
                { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', createdAt: new Date(Date.now() - 172800000).toISOString(), message: 'Your React skills are excellent!' }
            ];

            // Mock chart data
            projectsByMonth = [
                { month: 10, year: 2024, count: 3 },
                { month: 11, year: 2024, count: 5 },
                { month: 12, year: 2024, count: 4 }
            ];

            blogPostsByMonth = [
                { month: 10, year: 2024, count: 2 },
                { month: 11, year: 2024, count: 4 },
                { month: 12, year: 2024, count: 2 }
            ];

            messagesByMonth = [
                { month: 10, year: 2024, count: 8 },
                { month: 11, year: 2024, count: 12 },
                { month: 12, year: 2024, count: 5 }
            ];

            technologyStats = [
                { _id: 'React', count: 8 },
                { _id: 'Node.js', count: 6 },
                { _id: 'MongoDB', count: 4 },
                { _id: 'JavaScript', count: 10 },
                { _id: 'Tailwind CSS', count: 5 }
            ];

            tagStats = [
                { _id: 'React', count: 4 },
                { _id: 'JavaScript', count: 6 },
                { _id: 'Node.js', count: 3 },
                { _id: 'Frontend', count: 5 },
                { _id: 'Backend', count: 3 }
            ];

            weeklyActivity = {
                projects: [
                    { week: 48, year: 2024, count: 1 },
                    { week: 49, year: 2024, count: 2 },
                    { week: 50, year: 2024, count: 1 },
                    { week: 51, year: 2024, count: 0 }
                ],
                blogPosts: [
                    { week: 48, year: 2024, count: 1 },
                    { week: 49, year: 2024, count: 1 },
                    { week: 50, year: 2024, count: 0 },
                    { week: 51, year: 2024, count: 1 }
                ],
                messages: [
                    { week: 48, year: 2024, count: 3 },
                    { week: 49, year: 2024, count: 5 },
                    { week: 50, year: 2024, count: 2 },
                    { week: 51, year: 2024, count: 1 }
                ]
            };

            engagementMetrics = {
                projectsLast30Days: 4,
                blogPostsLast30Days: 3,
                messagesLast30Days: 8,
                totalUsers: 5,
                averageProjectsPerUser: '0.80',
                averageBlogPostsPerUser: '0.60'
            };
        }

        res.status(200).json({
            stats: {
                totalProjects,
                totalBlogPosts,
                totalMessages,
                totalUsers
            },
            recentActivity: {
                projects: recentProjects,
                blogPosts: recentBlogPosts,
                messages: recentMessages
            },
            charts: {
                projectsByMonth,
                blogPostsByMonth,
                messagesByMonth,
                technologyStats,
                tagStats,
                weeklyActivity,
                engagementMetrics
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMonthlyAggregationPipeline = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return [
        {
            $match: {
                createdAt: { $gte: oneYearAgo }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1
            }
        },
        {
            $project: {
                _id: 0,
                month: '$_id.month',
                year: '$_id.year',
                count: 1
            }
        }
    ];
};

// @desc    Get all projects for admin management
// @route   GET /api/admin/projects
// @access  Private
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new project
// @route   POST /api/admin/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        const { title, description, imageUrl, projectLink, technologies } = req.body;
        
        const newProject = new Project({
            title,
            description,
            imageUrl,
            projectLink,
            technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(tech => tech.trim())
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/admin/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    try {
        const { title, description, imageUrl, projectLink, technologies } = req.body;
        
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                imageUrl,
                projectLink,
                technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(tech => tech.trim())
            },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/admin/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all blog posts for admin management
// @route   GET /api/admin/blog-posts
// @access  Private
const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new blog post
// @route   POST /api/admin/blog-posts
// @access  Private
const createBlogPost = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        
        const newBlogPost = new BlogPost({
            title,
            content,
            author,
            tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())
        });

        const blogPost = await newBlogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/admin/blog-posts/:id
// @access  Private
const updateBlogPost = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        
        const blogPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                author,
                tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())
            },
            { new: true, runValidators: true }
        );

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/admin/blog-posts/:id
// @access  Private
const deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
        
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all messages for admin management
// @route   GET /api/admin/messages
// @access  Private
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/admin/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all users (for admin management)
// @route   GET /api/admin/users
// @access  Private
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Helper function to get weekly activity data
const getWeeklyActivityData = async () => {
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const weeklyData = await Promise.all([
        Project.aggregate([
            { $match: { createdAt: { $gte: fourWeeksAgo } } },
            {
                $group: {
                    _id: {
                        week: { $week: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.week': 1 } },
            { $project: { _id: 0, week: '$_id.week', year: '$_id.year', count: 1 } }
        ]),
        BlogPost.aggregate([
            { $match: { createdAt: { $gte: fourWeeksAgo } } },
            {
                $group: {
                    _id: {
                        week: { $week: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.week': 1 } },
            { $project: { _id: 0, week: '$_id.week', year: '$_id.year', count: 1 } }
        ]),
        Message.aggregate([
            { $match: { createdAt: { $gte: fourWeeksAgo } } },
            {
                $group: {
                    _id: {
                        week: { $week: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.week': 1 } },
            { $project: { _id: 0, week: '$_id.week', year: '$_id.year', count: 1 } }
        ])
    ]);

    return {
        projects: weeklyData[0],
        blogPosts: weeklyData[1],
        messages: weeklyData[2]
    };
};

// Helper function to get engagement metrics
const getEngagementMetrics = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [recentProjects, recentBlogPosts, recentMessages, totalUsers] = await Promise.all([
        Project.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        BlogPost.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Message.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        User.countDocuments()
    ]);

    return {
        projectsLast30Days: recentProjects,
        blogPostsLast30Days: recentBlogPosts,
        messagesLast30Days: recentMessages,
        totalUsers,
        averageProjectsPerUser: totalUsers > 0 ? (recentProjects / totalUsers).toFixed(2) : 0,
        averageBlogPostsPerUser: totalUsers > 0 ? (recentBlogPosts / totalUsers).toFixed(2) : 0
    };
};

module.exports = {
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
    getAllUsers,
};
