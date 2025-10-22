import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.MESSAGES);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Use mock data when API fails
      setMessages([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hi, I\'m interested in your portfolio. Could you tell me more about your React projects?',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Great work on the e-commerce website! I\'d like to discuss a potential collaboration.',
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          message: 'Your blog posts are very informative. Keep up the great work!',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${API_ENDPOINTS.MESSAGES}/${id}`);
        fetchMessages();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message._id}
                className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-colors ${
                  selectedMessage?._id === message._id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{message.name}</h3>
                    <p className="text-sm text-gray-600">{message.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(message.createdAt)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message._id);
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-gray-700 mt-2 line-clamp-2">{message.message}</p>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No messages found</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.name}</h2>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(selectedMessage.createdAt)}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Message:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
