import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Users,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types";
import NotificationBell from "../Dashboard/NotificationBell";
import useNotifications from "../../hooks/useNotifications";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-primary-100 text-primary-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-semibold text-gray-900">
                BookMyMandap ADMIN
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === UserRole.ADMIN && (
              <NotificationBell
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            )}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() =>
                user?.role === UserRole.ADMIN && navigate("/dashboard/profile")
              }
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 pt-16 lg:pt-0 z-20 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 flex flex-col h-full">
            <nav className="space-y-1">
              <NavLink to="/dashboard" end className={navLinkClass}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>

              {user?.role === UserRole.ADMIN && (
                <>
                  <NavLink to="/dashboard/providers" className={navLinkClass}>
                    <Store size={20} />
                    <span>Providers</span>
                  </NavLink>
                  <NavLink to="/dashboard/users" className={navLinkClass}>
                    <Users size={20} />
                    <span>Users</span>
                  </NavLink>
                </>
              )}

              {user?.role === UserRole.PROVIDER && (
                <NavLink to="/dashboard/profile" className={navLinkClass}>
                  <Store size={20} />
                  <span>My Business</span>
                </NavLink>
              )}

              {user?.role === UserRole.USER && (
                <NavLink to="/dashboard/venues" className={navLinkClass}>
                  <Store size={20} />
                  <span>Find Venues</span>
                </NavLink>
              )}
            </nav>

            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;