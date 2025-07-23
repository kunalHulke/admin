import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:4000/api';

// Configure Axios instance for Admin
const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add admin token
adminApi.interceptors.request.use((config) => {
  // Token is handled via cookies, no need to manually add it
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

// Response interceptor for error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Admin API Error:', error.response || error.message);
    if (error.response?.data?.error) {
      if (!error.response.data.error.includes('already logged in')) {
        toast.error(error.response.data.error);
      }
    } else if (error.message) {
      toast.error('Network error. Please try again.');
    }
    return Promise.reject(error);
  }
);

// Admin API Service for BookMyMandap
export const adminRegister = async ({ email, password }) => {
  const response = await adminApi.post('/admin/signup', { email, password });
  return response.data.data;
};

export const adminLogin = async ({ email, password }) => {
  const response = await adminApi.post('/admin/login', { email, password });
  return response.data.data;
};

export const adminLogout = async () => {
  const response = await adminApi.post('/admin/logout');
  return response.data.data;
};

export const addUser = async ({ fullName, email, phoneNumber, password }) => {
  const response = await adminApi.post('/admin/add-user', {
    fullName,
    email,
    phoneNumber,
    password,
  });
  return response.data.data;
};

export const addProvider = async ({ name, email, password, phoneNumber }) => {
  const response = await adminApi.post('/admin/add-provider', {
    name,
    email,
    password,
    phoneNumber,
  });
  return response.data.data;
};

export const getApprovalRequests = async () => {
  const response = await adminApi.get('/admin/approval-requests');
  return response.data.data;
};

export const approveOrRejectRequest = async ({ requestId, status }) => {
  const response = await adminApi.post('/admin/approve-request', { requestId, status });
  return response.data.data;
};

export const getNotifications = async () => {
  const response = await adminApi.get('/admin/notifications');
  return response.data.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await adminApi.post('/admin/notifications/mark-read', { notificationId });
  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await adminApi.get('/admin/users');
  return response.data.data;
};

export const getAllProviders = async () => {
  const response = await adminApi.get('/admin/providers');
  return response.data.data;
};

export const searchUsers = async (query) => {
  const response = await adminApi.get('/admin/search-users', { params: { query } });
  return response.data.data;
};

export const searchProviders = async (query) => {
  const response = await adminApi.get('/admin/search-providers', { params: { query } });
  return response.data.data;
};