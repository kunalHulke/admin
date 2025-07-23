import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SOCKET_URL = 'http://localhost:4000';

// Admin Socket Service for BookMyMandap
class AdminSocketService {
  constructor() {
    this.socket = null;
  }

  // Initialize Socket.IO connection
  connect(adminId) {
    if (!adminId) {
      toast.error('Admin ID is required for socket connection');
      return;
    }

    // Create socket connection with authentication token
    this.socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    // Handle connection
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', this.socket.id);
      // Join admin room
      this.socket.emit('joinAdminRoom', adminId);
      toast.success('Connected to real-time updates');
    });

    // Handle new user registration event
    this.socket.on('newUserRegistration', (data) => {
      console.log('New user registered:', data);
      toast.success(`New user registered: ${data.user.fullName}`);
      // Trigger a refresh of data if needed
      window.dispatchEvent(new CustomEvent('refreshUsers'));
    });

    // Handle new provider registration event
    this.socket.on('newProviderRegistration', (data) => {
      console.log('New provider registered:', data);
      toast.success(`New provider registered: ${data.provider.name}`);
      // Trigger a refresh of data if needed
      window.dispatchEvent(new CustomEvent('refreshProviders'));
    });

    // Handle approval status update
    this.socket.on('approvalStatusUpdate', (data) => {
      console.log('Approval status updated:', data);
      toast.success(`Provider ${data.providerId.name} ${data.status}`);
      // Trigger a refresh of data if needed
      window.dispatchEvent(new CustomEvent('refreshApprovalRequests'));
    });

    // Handle connection error
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      toast.error('Failed to connect to real-time updates');
    });

    // Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      toast.error('Disconnected from real-time updates');
    });
  }

  // Disconnect from Socket.IO
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Admin socket disconnected');
    }
  }

  // Check if socket is connected
  isConnected() {
    return this.socket?.connected || false;
  }
}

export const adminSocketService = new AdminSocketService();