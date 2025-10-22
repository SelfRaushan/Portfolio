// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  ME: '/auth/me',
  
  // Admin endpoints
  STATS: '/admin/stats',
  PROJECTS: '/admin/projects',
  BLOG_POSTS: '/admin/blog-posts',
  MESSAGES: '/admin/messages',
  USERS: '/admin/users',
};

export default API_BASE_URL;
