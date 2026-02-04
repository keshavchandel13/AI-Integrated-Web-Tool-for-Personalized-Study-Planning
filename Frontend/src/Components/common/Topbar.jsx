import React, { useState } from "react";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import Notifications from "../notification/Notification";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="
      h-16
      bg-white/80
      dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950
      backdrop-blur-sm
      border-b border-purple-100
      flex items-center
      px-3 md:px-6
      gap-2
    ">

      {/* Title */}
      <div className="flex-1 min-w-0 font-semibold text-purple-800 dark:text-purple-200">

        {/* Mobile */}
        <h1 className="text-base translate-x-14 sm:hidden truncate">
          EduPilot
        </h1>

        {/* Desktop */}
        <h1 className="hidden sm:block text-lg truncate">
          EduPilot — Your Personalized Learning Platform
        </h1>

      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 sm:gap-3 relative">

        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            className="p-2 rounded-md text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800"
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <FiBell className="w-5 h-5" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[90vw] max-w-sm z-50">
              <Notifications userId={user?.id} />
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-md text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800">
          <FiMessageCircle className="w-5 h-5" />
        </button>

        {/* Profile */}
        <Link to="/profile" className="flex items-center gap-2">

          <div className="hidden sm:block text-right leading-tight">
            <p className="text-purple-800 dark:text-purple-200 font-medium truncate max-w-[120px]">
              {user?.username || "Guest"}
            </p>
            <p className="text-purple-500 text-xs truncate max-w-[120px]">
              {user?.branch || ""}
            </p>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-200 bg-gray-200">
            <img
              src={user?.avatar || "/avatar-placeholder.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

        </Link>
      </div>
    </header>
  );
}
