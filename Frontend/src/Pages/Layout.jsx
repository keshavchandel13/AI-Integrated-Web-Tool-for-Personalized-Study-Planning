import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/common/Sidebar';
import Topbar from '../Components/common/Topbar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-4 text-black dark:text-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
