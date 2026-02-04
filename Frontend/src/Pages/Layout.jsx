import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import Topbar from "../Components/common/Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col w-full">

        {/* Topbar */}
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>

        {/* Scrollable content area */}
        <main className="
          flex-1
          overflow-y-auto
          p-3 md:p-6
          text-black dark:text-gray-200
        ">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
