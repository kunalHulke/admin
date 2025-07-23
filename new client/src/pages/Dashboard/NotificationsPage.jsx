import React, { useState } from "react";
import { Bell, User, Store, Filter, CheckCircle } from "lucide-react";
import useNotifications from "../../hooks/useNotifications";
import { formatDateTime } from "../../utils/dateUtils";

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, loading } =
    useNotifications();

  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "users") return notification.type === "new_user";
    if (filter === "providers") return notification.type === "new_provider";
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_user":
        return <User size={16} className="text-blue-500" />;
      case "new_provider":
        return <Store size={16} className="text-green-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Notifications
          </h1>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${
              filter === "all"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Bell size={14} />
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Filter size={14} />
            Unread
          </button>
          <button
            onClick={() => setFilter("users")}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${
              filter === "users"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <User size={14} />
            Users
          </button>
          <button
            onClick={() => setFilter("providers")}
            className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${
              filter === "providers"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Store size={14} />
            Providers
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <p>Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell size={24} className="mx-auto mb-3 text-gray-400" />
            <p>No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? "bg-primary-50" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-gray-100">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;