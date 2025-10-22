import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalMessages: 0,
    totalUsers: 0
  });
  const [recentActivity, setRecentActivity] = useState({
    projects: [],
    blogPosts: [],
    messages: []
  });
  const [chartData, setChartData] = useState({
    projectsByMonth: [],
    blogPostsByMonth: [],
    messagesByMonth: [],
    technologyStats: [],
    tagStats: [],
    weeklyActivity: { projects: [], blogPosts: [], messages: [] },
    engagementMetrics: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.STATS);
      setStats(response.data.stats);
      setRecentActivity(response.data.recentActivity);
      setChartData(response.data.charts || {
        projectsByMonth: [],
        blogPostsByMonth: [],
        messagesByMonth: [],
        technologyStats: [],
        tagStats: [],
        weeklyActivity: { projects: [], blogPosts: [], messages: [] },
        engagementMetrics: {}
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data when API fails
      setStats({
        totalProjects: 5,
        totalBlogPosts: 3,
        totalMessages: 12,
        totalUsers: 8
      });
      setRecentActivity({
        projects: [
          { _id: '1', title: 'E-commerce Website', createdAt: new Date().toISOString() },
          { _id: '2', title: 'Mobile App', createdAt: new Date().toISOString() }
        ],
        blogPosts: [
          { _id: '1', title: 'Getting Started with React', author: 'Admin', createdAt: new Date().toISOString() },
          { _id: '2', title: 'Node.js Best Practices', author: 'Admin', createdAt: new Date().toISOString() }
        ],
        messages: [
          { _id: '1', name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
        ]
      });
      setChartData({
        projectsByMonth: [],
        blogPostsByMonth: [],
        messagesByMonth: [],
        technologyStats: [],
        tagStats: [],
        weeklyActivity: { projects: [], blogPosts: [], messages: [] },
        engagementMetrics: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalProjects || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalBlogPosts || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalMessages || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends (Last 12 Months)</h3>
          <Line 
            data={getCombinedChartData(chartData.projectsByMonth || [], chartData.blogPostsByMonth || [], chartData.messagesByMonth || [])} 
            options={getLineChartOptions()}
          />
        </div>
        
        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity (Last 4 Weeks)</h3>
          <Bar 
            data={getWeeklyChartData(chartData.weeklyActivity || { projects: [], blogPosts: [], messages: [] })} 
            options={getBarChartOptions()}
          />
        </div>
      </div>

      {/* Technology & Tags Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Usage</h3>
          <Doughnut 
            data={getDoughnutChartData(chartData.technologyStats || [])} 
            options={getDoughnutChartOptions()}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Post Tags</h3>
          <Pie 
            data={getDoughnutChartData(chartData.tagStats || [])} 
            options={getDoughnutChartOptions()}
          />
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics (Last 30 Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{chartData?.engagementMetrics?.projectsLast30Days || 0}</div>
            <div className="text-sm text-gray-600">New Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{chartData?.engagementMetrics?.blogPostsLast30Days || 0}</div>
            <div className="text-sm text-gray-600">New Blog Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{chartData?.engagementMetrics?.messagesLast30Days || 0}</div>
            <div className="text-sm text-gray-600">New Messages</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {recentActivity?.projects?.length > 0 ? (
              recentActivity.projects.map((project) => (
                <div key={project._id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{project.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(project.createdAt)}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent projects</p>
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h3>
          <div className="space-y-3">
            {recentActivity?.blogPosts?.length > 0 ? (
              recentActivity.blogPosts.map((post) => (
                <div key={post._id} className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">by {post.author} • {formatDate(post.createdAt)}</p>
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent blog posts</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {recentActivity?.messages?.length > 0 ? (
              recentActivity.messages.map((message) => (
                <div key={message._id} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{message.name}</p>
                  <p className="text-xs text-gray-500">{message.email} • {formatDate(message.createdAt)}</p>
                  {message.message && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {message.message.length > 50 ? `${message.message.substring(0, 50)}...` : message.message}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent messages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chart helper functions
const getCombinedChartData = (projectsData, blogData, messagesData) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Create a map of all months with data
  const allMonths = new Map();
  
  // Process each dataset
  [projectsData, blogData, messagesData].forEach((data, index) => {
    data.forEach(d => {
      const key = `${d.year}-${d.month}`;
      if (!allMonths.has(key)) {
        allMonths.set(key, { year: d.year, month: d.month, projects: 0, blogPosts: 0, messages: 0 });
      }
      if (index === 0) allMonths.get(key).projects = d.count;
      else if (index === 1) allMonths.get(key).blogPosts = d.count;
      else if (index === 2) allMonths.get(key).messages = d.count;
    });
  });

  // Sort by year and month
  const sortedMonths = Array.from(allMonths.values()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const labels = sortedMonths.map(d => `${monthNames[d.month - 1]} ${d.year}`);

  return {
    labels,
    datasets: [
      {
        label: 'Projects',
        data: sortedMonths.map(d => d.projects),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Blog Posts',
        data: sortedMonths.map(d => d.blogPosts),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Messages',
        data: sortedMonths.map(d => d.messages),
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  };
};

const getWeeklyChartData = (weeklyData) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  
  return {
    labels: weeks,
    datasets: [
      {
        label: 'Projects',
        data: weeklyData.projects.map(d => d.count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Blog Posts',
        data: weeklyData.blogPosts.map(d => d.count),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Messages',
        data: weeklyData.messages.map(d => d.count),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const getDoughnutChartData = (data) => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  return {
    labels: data.map(d => d._id),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };
};

const getLineChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

const getBarChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

const getDoughnutChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
  },
});

export default Dashboard;
