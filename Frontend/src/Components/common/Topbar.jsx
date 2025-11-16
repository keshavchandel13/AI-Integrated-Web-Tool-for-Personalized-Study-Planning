import React, { useState } from "react";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import Notifications from "../notification/Notification";
import { Moon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 backdrop-blur-sm border-b border-purple-100 flex items-center justify-between px-6 relative">
      {/* Left side (Search bar placeholder) */}
      <div className="flex-1 max-w-md"></div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4 relative">
        {/* dark theme */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 rounded-md text-purple-600 hover:bg-purple-50"
            onClick={handleToggleNotifications}
          >
            <FiBell className="w-5 h-5" />
          </button>

          {/* Show notifications when toggled */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 z-50">
              <Notifications userId={user?.id} />
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-md text-purple-600 hover:bg-purple-50">
          <FiMessageCircle className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-purple-800">{user?.username}</p>
            <p className="text-purple-500 text-sm">Computer Science</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
