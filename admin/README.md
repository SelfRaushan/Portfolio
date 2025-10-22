# Portfolio Admin Panel

A comprehensive admin panel for managing your portfolio website, built with React and Tailwind CSS.

## Features

### 🎯 Dashboard
- Overview statistics (projects, blog posts, messages, users)
- Recent activity feed
- Quick access to all sections

### 💼 Project Management
- Create, read, update, and delete projects
- Upload project images via URL
- Manage project technologies and links
- Visual project cards with image previews

### 📝 Blog Post Management
- Full CRUD operations for blog posts
- Rich text content editing
- Tag management system
- Author assignment

### 💬 Message Management
- View all contact form messages
- Delete unwanted messages
- Detailed message viewer
- Sender information and timestamps

### 👥 User Management
- View all registered users
- User information display
- Registration date tracking

### 🔐 Authentication
- Secure login system
- JWT token-based authentication
- Protected routes
- Auto-logout on token expiration

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Backend**: Node.js, Express, MongoDB (via existing backend)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running backend server (Portfolio backend)

### Installation

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Configuration

Make sure your backend server is running on `http://localhost:5000` and includes the admin routes. The admin panel expects the following API endpoints:

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/blog-posts` - List all blog posts
- `POST /api/admin/blog-posts` - Create new blog post
- `PUT /api/admin/blog-posts/:id` - Update blog post
- `DELETE /api/admin/blog-posts/:id` - Delete blog post
- `GET /api/admin/messages` - List all messages
- `DELETE /api/admin/messages/:id` - Delete message
- `GET /api/admin/users` - List all users
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   └── Sidebar.jsx          # Navigation sidebar
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Projects.jsx         # Project management
│   │   ├── BlogPosts.jsx        # Blog post management
│   │   ├── Messages.jsx         # Message management
│   │   ├── Users.jsx            # User management
│   │   └── Login.jsx            # Login page
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── package.json
└── README.md
```

## Usage

### Login
1. Access the admin panel
2. Enter your admin credentials
3. You'll be redirected to the dashboard upon successful login

### Managing Projects
1. Navigate to "Projects" in the sidebar
2. Click "Add New Project" to create a project
3. Fill in project details including title, description, image URL, project link, and technologies
4. Use "Edit" and "Delete" buttons to manage existing projects

### Managing Blog Posts
1. Navigate to "Blog Posts" in the sidebar
2. Click "Add New Post" to create a blog post
3. Fill in post details including title, content, author, and tags
4. Use "Edit" and "Delete" buttons to manage existing posts

### Viewing Messages
1. Navigate to "Messages" in the sidebar
2. Click on any message to view full details
3. Use the delete button to remove unwanted messages

### User Management
1. Navigate to "Users" in the sidebar
2. View all registered users and their information
3. See registration dates and user details

## API Integration

The admin panel integrates with your existing backend API. Make sure your backend includes:

1. **Authentication middleware** for protecting admin routes
2. **Admin controller** with all CRUD operations
3. **Admin routes** properly configured
4. **CORS settings** to allow frontend requests

## Customization

### Styling
The admin panel uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying Tailwind classes in components
2. Adding custom CSS in `index.css`
3. Updating the color scheme in component files

### Adding New Features
To add new admin features:

1. Create new components in the `src/components/` directory
2. Add new pages in the `src/pages/` directory
3. Update the sidebar navigation in `Sidebar.jsx`
4. Add new routes in `App.jsx`
5. Implement corresponding backend API endpoints

## Security Notes

- All admin routes are protected by authentication
- JWT tokens are stored in localStorage
- API requests include authorization headers
- Tokens are automatically refreshed on app load

## Troubleshooting

### Common Issues

1. **Login not working**: Check if backend authentication endpoints are properly configured
2. **API errors**: Verify backend server is running and CORS is configured
3. **Styling issues**: Ensure Tailwind CSS is properly installed and configured

### Development Tips

- Use browser developer tools to debug API calls
- Check network tab for failed requests
- Verify backend logs for server-side errors
- Use React DevTools for component debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of your portfolio admin system. All rights reserved.