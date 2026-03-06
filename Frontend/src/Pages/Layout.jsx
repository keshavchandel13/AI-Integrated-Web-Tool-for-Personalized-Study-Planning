import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import Topbar from "../Components/common/Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col md:ml-60 min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <Topbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 text-black dark:text-gray-200">
          <Outlet />
        </main>

      </div>
    </div>
  );
}