import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.USERS);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Use mock data when API fails
      setUsers([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          username: 'johndoe',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          username: 'janesmith',
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          username: 'mikej',
          createdAt: new Date().toISOString()
        }
      ]);
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Users</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Users ({users.length})</h2>
        </div>
        
        {users.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div key={user._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-medium">
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {user.name || 'No name provided'}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
