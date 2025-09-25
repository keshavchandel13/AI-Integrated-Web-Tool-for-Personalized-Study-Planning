import React from 'react'
import { FiBell, FiSearch, FiMessageCircle } from "react-icons/fi";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
 <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-purple-100 flex items-center justify-between px-6 ">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          {/* <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search topics, notes, or quizzes..."
            className="w-full pl-10 pr-3 py-2 rounded-md bg-purple-50/50 border border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-200 outline-none"
          /> */}
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-md text-purple-600 hover:bg-purple-50">
          <FiBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs">
            3
          </span>
        </button>

        {/* Messages */}
        <button className="p-2 rounded-md text-purple-600 hover:bg-purple-50">
          <FiMessageCircle className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-purple-800">{user.username}</p>
            <p className="text-purple-500 text-sm">Computer Science</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200">
            <img
              src="/"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
