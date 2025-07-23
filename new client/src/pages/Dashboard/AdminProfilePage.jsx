import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Edit,
  Save,
  AlertCircle,
  Bell,
} from "lucide-react";
import Avatar from "../../components/common/Avatar";
import { formatDate, formatDateTime } from "../../utils/dateUtils";

// Mock data for the admin profile
const mockAdminProfile = {
  id: "1",
  name: "Aditya Sharma",
  email: "aditya@bookmymandap.com",
  role: "admin",
  avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  phone: "+91 98765 43210",
  jobTitle: "System Administrator",
  bio: "Experienced system administrator with expertise in venue management platforms.",
  lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  notificationPreferences: {
    email: true,
    inApp: true,
  },
  createdAt: new Date(),
};

// Mock data for recent activities
const recentActivities = [
  {
    id: "1",
    action: "Approved Provider",
    description: "Approved Raj Mahal as a new venue provider",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    performedBy: {
      id: "1",
      name: "Aditya Sharma",
    },
  },
  {
    id: "2",
    action: "Updated Settings",
    description: "Changed notification preferences",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    performedBy: {
      id: "1",
      name: "Aditya Sharma",
    },
  },
  {
    id: "3",
    action: "Rejected Provider",
    description:
      "Rejected Golden Palace application due to incomplete information",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    performedBy: {
      id: "1",
      name: "Aditya Sharma",
    },
  },
];

const AdminProfilePage = () => {
  const [profile, setProfile] = useState(mockAdminProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(mockAdminProfile);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would make an API call here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleNotification = (type) => {
    setEditedProfile((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type],
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>
        <div className="p-6 -mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <Avatar
                name={profile.name}
                src={profile.avatar}
                size="xl"
                className="border-4 border-white shadow-md"
              />
              <div className="text-center sm:text-left mt-2 sm:mt-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <p className="text-gray-600">{profile.jobTitle}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-full">
                    <User size={16} />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5"
                    />
                  ) : (
                    <span className="text-gray-700">{profile.name}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-full">
                    <Mail size={16} />
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5"
                    />
                  ) : (
                    <span className="text-gray-700">{profile.email}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-full">
                    <Phone size={16} />
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedProfile.phone || ""}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {profile.phone || "Not specified"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-full">
                    <Calendar size={16} />
                  </div>
                  <span className="text-gray-700">
                    Account created on{" "}
                    {formatDate(profile.createdAt || new Date())}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-full">
                    <Clock size={16} />
                  </div>
                  <span className="text-gray-700">
                    Last login:{" "}
                    {profile.lastLogin
                      ? formatDateTime(profile.lastLogin)
                      : "Never"}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={editedProfile.bio || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
              )}

              {!isEditing && profile.bio && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </h3>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gray-600" />
                    <span className="text-gray-700">Email Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing
                          ? editedProfile.notificationPreferences.email
                          : profile.notificationPreferences.email
                      }
                      onChange={() =>
                        isEditing && handleToggleNotification("email")
                      }
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 ${
                        isEditing ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    ></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-gray-600" />
                    <span className="text-gray-700">In-App Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        isEditing
                          ? editedProfile.notificationPreferences.inApp
                          : profile.notificationPreferences.inApp
                      }
                      onChange={() =>
                        isEditing && handleToggleNotification("inApp")
                      }
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 ${
                        isEditing ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    ></div>
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Security Tips
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={20}
                      className="text-yellow-500 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-yellow-700">
                        Keep your account secure
                      </h3>
                      <p className="text-sm text-yellow-600 mt-1">
                        Remember to use a strong password and enable two-factor
                        authentication for added security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-l-2 border-gray-200 pl-4 py-1"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {activity.action}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDateTime(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;