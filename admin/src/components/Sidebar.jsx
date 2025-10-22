import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Projects', href: '/projects', icon: '💼' },
    { name: 'Blog Posts', href: '/blog-posts', icon: '📝' },
    { name: 'Messages', href: '/messages', icon: '💬' },
    { name: 'Users', href: '/users', icon: '👥' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400">Portfolio Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Admin info and Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">admin@test.com</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
