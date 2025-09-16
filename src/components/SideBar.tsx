import { NavLink } from 'react-router-dom';
import { FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { navLink } from '../data';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, setMobileOpen }) => {


  const renderNavItems = () => (
    <>
      {navLink.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white font-semibold' : 'text-white hover:bg-primary/80'
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Icon className="text-2xl" />
            {!collapsed && <span className="text-lg">{item.title}</span>}
          </NavLink>
        );
      })}
      <button
        className=" flex items-center gap-3 px-4 py-2 rounded-md transition-colors hover:bg-primary/80 cursor-pointer"

      >
        <FaSignOutAlt className="mx-auto text-white" size={23}/>
        {!collapsed && "Logout"}


      </button>
    </>
  );



  return (
    <>
      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50 z-50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex flex-col w-64 bg-primary text-white z-60">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h1 className="text-lg font-bold">Agent Panel</h1>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white focus:outline-none cursor-pointer"
                aria-label="Close sidebar"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="mt-4 space-y-2">{renderNavItems()}</nav>
          </div>
        </div>
      )}

      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-40 text-white bg-primary p-2 rounded-md focus:outline-none md:hidden"
          aria-label="Open sidebar cursor-pointer"
        >
          <FaBars className="cursor-pointer" />
        </button>
      )}

      <div
        className={`hidden md:flex flex-col h-screen bg-primary text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20 cursor-pointer">
          {!collapsed && <h1 className="text-lg font-bold">Agent Panel</h1>}

        </div>
        <nav className="mt-4 space-y-2">{renderNavItems()}</nav>
      </div>
    </>
  );
};

export default Sidebar;
