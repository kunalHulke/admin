import React, { useState, useEffect } from 'react';
import UsersList from '../../components/Dashboard/UsersList';
import { getAllUsers } from '../../services/api';
import toast from 'react-hot-toast';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      
      // Format users data
      const formattedUsers = response.users.map(user => ({
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: 'user',
        createdAt: user.createdAt || new Date().toISOString(),
      }));
      
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    
    // Listen for refresh events from socket
    const handleRefresh = () => {
      fetchUsers();
    };
    
    window.addEventListener('refreshUsers', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshUsers', handleRefresh);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">View and manage user accounts</p>
      </div>
      
      <UsersList users={users} />
    </div>
  );
};

export default UsersManagement;