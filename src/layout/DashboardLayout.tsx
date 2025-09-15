// src/App.tsx
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import Topbar from '../components/TopBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-col flex-1">
        <Topbar
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          toggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        <main className="p-4">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
