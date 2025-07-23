import { useState, useEffect } from "react";
import { getNotifications, markNotificationAsRead } from "../services/api";
import toast from 'react-hot-toast';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(notification => 
          markNotificationAsRead(notification._id)
        )
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      _id: Math.random().toString(36).substring(2, 9),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      const formattedNotifications = response.notifications.map(notification => ({
        ...notification,
        id: notification._id,
        createdAt: new Date(notification.createdAt || Date.now()),
        read: notification.read || false
      }));
      setNotifications(formattedNotifications);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError("Failed to fetch notifications");
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    addNotification,
    fetchNotifications,
  };
};

export default useNotifications;