import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/common/Sidebar';
import Topbar from '../Components/common/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      
      <div className="fixed left-0 top-0 h-full w-60 z-50">
        <Sidebar />
      </div>

      <div className="ml-60 flex-1 flex flex-col">
        <Topbar />
        <div className="p-4 text-black dark:text-gray-200">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
