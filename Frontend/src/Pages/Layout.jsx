import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/common/Sidebar';
import Topbar from '../Components/common/Topbar';

export default function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {/* Topbar */}
        <Topbar />
        {/* Routed content */}
        <div style={{ padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
