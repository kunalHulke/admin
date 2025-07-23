import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Store, 
  Clock, 
  CheckCircle,
  Plus,
  X
} from 'lucide-react';
import StatCard from '../../components/Dashboard/StatCard';
import Chart from '../../components/Dashboard/Chart';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { getAllUsers, getAllProviders, getApprovalRequests } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { register, registerProvider } = useAuth();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalProviders: 0,
    pendingProviders: 0,
    approvedProviders: 0,
  });

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const [providerData, setProviderData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const [usersResponse, providersResponse, requestsResponse] = await Promise.all([
        getAllUsers(),
        getAllProviders(),
        getApprovalRequests()
      ]);

      const pendingCount = requestsResponse.requests.filter(req => req.status === 'pending').length;
      const approvedCount = requestsResponse.requests.filter(req => req.status === 'approved').length;

      setAnalytics({
        totalUsers: usersResponse.users.length,
        totalProviders: providersResponse.providers.length,
        pendingProviders: pendingCount,
        approvedProviders: approvedCount,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Listen for refresh events from socket
    const handleRefresh = () => {
      fetchAnalytics();
    };
    
    window.addEventListener('refreshUsers', handleRefresh);
    window.addEventListener('refreshProviders', handleRefresh);
    window.addEventListener('refreshApprovalRequests', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshUsers', handleRefresh);
      window.removeEventListener('refreshProviders', handleRefresh);
      window.removeEventListener('refreshApprovalRequests', handleRefresh);
    };
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register({
        ...userData,
        role: UserRole.USER
      });
      setShowUserModal(false);
      setUserData({ name: '', email: '', password: '', phoneNumber: '' });
      fetchAnalytics(); // Refresh analytics
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateProvider = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await registerProvider({
        ...providerData,
        role: UserRole.PROVIDER,
        phone: providerData.phoneNumber
      });
      setShowProviderModal(false);
      setProviderData({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
      });
      fetchAnalytics(); // Refresh analytics
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock chart data for now
  const mockUserGrowth = [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 2 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 3 },
    { month: 'May', count: 2 },
    { month: 'Jun', count: 5 },
  ];

  const mockProviderGrowth = [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 1 },
    { month: 'Jun', count: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your platform's performance</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUserModal(true)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Plus size={16} />
            Add User
          </button>
          <button
            onClick={() => setShowProviderModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Provider
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={analytics.totalUsers}
          icon={Users}
          color="bg-primary-600"
          change={{ value: 12, isPositive: true }}
        />
        
        <StatCard 
          title="Total Providers" 
          value={analytics.totalProviders}
          icon={Store}
          color="bg-secondary-600"
          change={{ value: 8, isPositive: true }}
        />
        
        <StatCard 
          title="Pending Approvals" 
          value={analytics.pendingProviders}
          icon={Clock}
          color="bg-warning-600"
          change={{ value: 0, isPositive: true }}
        />
        
        <StatCard 
          title="Approved Providers" 
          value={analytics.approvedProviders}
          icon={CheckCircle}
          color="bg-success-600"
          change={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          title="User Growth"
          data={mockUserGrowth}
          dataKey="users"
          color="#7C3AED"
          gradient={{ start: "#c4b5fd", end: "#ede9fe" }}
        />
        
        <Chart 
          title="Provider Growth"
          data={mockProviderGrowth}
          dataKey="providers"
          color="#0EA5E9"
          gradient={{ start: "#bae6fd", end: "#e0f2fe" }}
        />
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New user registration</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-warning-100 flex items-center justify-center flex-shrink-0">
              <Store size={16} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New provider registration</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Provider approved</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={userData.phoneNumber}
                  onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Provider Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create New Provider</h2>
              <button
                onClick={() => setShowProviderModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProvider} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="provider-name" className="form-label">Full name</label>
                <input
                  id="provider-name"
                  type="text"
                  value={providerData.name}
                  onChange={(e) => setProviderData({ ...providerData, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="provider-email" className="form-label">Email address</label>
                <input
                  id="provider-email"
                  type="email"
                  value={providerData.email}
                  onChange={(e) => setProviderData({ ...providerData, email: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="provider-phoneNumber" className="form-label">Phone Number</label>
                <input
                  id="provider-phoneNumber"
                  type="tel"
                  value={providerData.phoneNumber}
                  onChange={(e) => setProviderData({ ...providerData, phoneNumber: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="provider-password" className="form-label">Password</label>
                <input
                  id="provider-password"
                  type="password"
                  value={providerData.password}
                  onChange={(e) => setProviderData({ ...providerData, password: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProviderModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Creating...' : 'Create Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;